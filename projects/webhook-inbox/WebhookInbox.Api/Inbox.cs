using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using Microsoft.EntityFrameworkCore;

namespace WebhookInbox;
public sealed class InboxEvent
{
    public string Id { get; set; } = "";
    public string Payload { get; set; } = "";
    public string PayloadHash { get; set; } = "";
    public string Status { get; set; } = "Pending";
    public int Attempts { get; set; }
    public long AvailableAt { get; set; }
    public string? LastError { get; set; }
}
public sealed class Award
{
    public string Id { get; set; } = "";
    public string Player { get; set; } = "";
    public int Points { get; set; }
}
public record AwardPayload(string Type, string Player, int Points);
public sealed class InboxDb(DbContextOptions<InboxDb> options) : DbContext(options)
{
    public DbSet<InboxEvent> Events => Set<InboxEvent>();
    public DbSet<Award> Awards => Set<Award>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<InboxEvent>().HasIndex(x => new { x.Status, x.AvailableAt });
        b.Entity<Award>().HasOne<InboxEvent>().WithOne().HasForeignKey<Award>(x => x.Id);
    }
}
public static class Signature
{
    public static string Sign(string secret, long timestamp, string eventId, string body) => Convert.ToHexString(HMACSHA256.HashData(Encoding.UTF8.GetBytes(secret), Encoding.UTF8.GetBytes($"{timestamp}.{eventId}.{body}")));
    public static bool Valid(string secret, long timestamp, string eventId, string body, string supplied, long now)
    {
        if (timestamp < now - 300 || timestamp > now + 300) return false;
        try { return CryptographicOperations.FixedTimeEquals(Convert.FromHexString(Sign(secret, timestamp, eventId, body)), Convert.FromHexString(supplied)); }
        catch (FormatException) { return false; }
    }
}
public sealed class InboxProcessor(InboxDb db, TimeProvider clock, ILogger<InboxProcessor> logger)
{
    public async Task<bool> ProcessNext(CancellationToken ct = default)
    {
        // SQLite serializes writers. The effect and acknowledgement commit in the same transaction.
        // A crash before commit rolls both back; this guarantee covers this database only.
        await using var tx = await db.Database.BeginTransactionAsync(ct);
        var now = clock.GetUtcNow().ToUnixTimeSeconds();
        var evt = await db.Events.Where(x => x.Status == "Pending" && x.AvailableAt <= now).OrderBy(x => x.AvailableAt).ThenBy(x => x.Id).FirstOrDefaultAsync(ct);
        if (evt is null) return false;
        evt.Attempts++;
        try
        {
            var payload = JsonSerializer.Deserialize<AwardPayload>(evt.Payload, new JsonSerializerOptions(JsonSerializerDefaults.Web));
            if (payload is null || payload.Type != "points.awarded" || string.IsNullOrWhiteSpace(payload.Player) || payload.Player.Length > 80 || payload.Points is <= 0 or > 10000) throw new InvalidOperationException("Unsupported event or invalid award.");
            db.Awards.Add(new Award { Id = evt.Id, Player = payload.Player, Points = payload.Points });
            evt.Status = "Completed"; evt.LastError = null;
        }
        catch (Exception ex) when (ex is JsonException or InvalidOperationException)
        {
            evt.LastError = "Unsupported event or invalid award.";
            evt.Status = evt.Attempts >= 3 ? "DeadLetter" : "Pending";
            evt.AvailableAt = now + (long)Math.Pow(2, evt.Attempts);
            logger.LogWarning("Event {EventId}: attempt {Attempt}, status {Status}", evt.Id, evt.Attempts, evt.Status);
        }
        await db.SaveChangesAsync(ct); await tx.CommitAsync(ct);
        logger.LogInformation("Event {EventId}: status {Status}", evt.Id, evt.Status);
        return true;
    }
}
public sealed class InboxWorker(IServiceScopeFactory scopes, ILogger<InboxWorker> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                using var scope = scopes.CreateScope();
                var worked = await scope.ServiceProvider.GetRequiredService<InboxProcessor>().ProcessNext(stoppingToken);
                if (!worked) await Task.Delay(500, stoppingToken);
            }
            catch (OperationCanceledException) when (stoppingToken.IsCancellationRequested) { break; }
            catch (Exception ex)
            {
                logger.LogError(ex, "Inbox worker failed; retrying after delay");
                await Task.Delay(1000, stoppingToken);
            }
        }
    }
}
