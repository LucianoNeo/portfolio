using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using RaidBooking;

var builder = WebApplication.CreateBuilder(args);
var adminKey = builder.Configuration["AdminKey"] ?? (builder.Environment.IsDevelopment() ? "local-demo-admin-key" : throw new InvalidOperationException("Set AdminKey."));
if (adminKey.Length < 16) throw new InvalidOperationException("AdminKey must contain at least 16 characters.");
builder.Services.AddDbContext<RaidsDb>(o => o.UseSqlite(builder.Configuration.GetConnectionString("Database") ?? "Data Source=raids.db;Default Timeout=30"));
builder.Services.AddProblemDetails(); builder.Services.AddOpenApi();
var app = builder.Build(); app.UseExceptionHandler();
using (var scope = app.Services.CreateScope()) scope.ServiceProvider.GetRequiredService<RaidsDb>().Database.EnsureCreated();
if (app.Environment.IsDevelopment()) app.MapOpenApi();
static string Hash(string token) => Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(token)));
static Task<Player?> PlayerFor(HttpContext ctx, RaidsDb db)
{
    var token = ctx.Request.Headers["X-Player-Token"].ToString();
    var hash = Hash(token);
    return db.Players.SingleOrDefaultAsync(x => x.TokenHash == hash);
}
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapPost("/players", async (CreatePlayer r, RaidsDb db) =>
{
    if (string.IsNullOrWhiteSpace(r.Name) || r.Name.Length > 80) return Results.BadRequest();
    var token = Convert.ToHexString(RandomNumberGenerator.GetBytes(32));
    var player = new Player { Name = r.Name.Trim(), TokenHash = Hash(token) };
    db.Players.Add(player); await db.SaveChangesAsync();
    return Results.Created($"/players/{player.Id}", new { player.Id, token });
});
app.MapPost("/raids", async (CreateRaid r, HttpContext ctx, RaidsDb db) =>
{
    if (!CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(ctx.Request.Headers["X-Admin-Key"].ToString()), Encoding.UTF8.GetBytes(adminKey))) return Results.Unauthorized();
    if (string.IsNullOrWhiteSpace(r.Name) || r.Name.Length > 120 || r.Capacity is < 1 or > 100 || r.StartsAt <= DateTimeOffset.UtcNow.ToUnixTimeSeconds()) return Results.BadRequest();
    var raid = new Raid { Name = r.Name.Trim(), Capacity = r.Capacity, StartsAt = r.StartsAt };
    db.Raids.Add(raid); await db.SaveChangesAsync(); return Results.Created($"/raids/{raid.Id}", raid);
});
app.MapGet("/raids", async (RaidsDb db) => Results.Ok(await db.Raids.AsNoTracking().OrderBy(x => x.StartsAt).Take(100).ToListAsync()));
app.MapGet("/raids/{id:guid}", async (Guid id, RaidsDb db) => await db.Raids.FindAsync(id) is { } raid ? Results.Ok(raid) : Results.NotFound());
app.MapPost("/raids/{id:guid}/reservations", async (Guid id, HttpContext ctx, RaidsDb db) =>
{
    var player = await PlayerFor(ctx, db); if (player is null) return Results.Unauthorized();
    var key = ctx.Request.Headers["Idempotency-Key"].ToString();
    if (string.IsNullOrWhiteSpace(key) || key.Length > 100) return Results.BadRequest(new { error = "Idempotency-Key required (max 100 characters)." });
    // A database transaction protects the counter and reservation together, across API processes.
    await using var tx = await db.Database.BeginTransactionAsync();
    var previous = await db.Reservations.SingleOrDefaultAsync(x => x.RaidId == id && x.PlayerId == player.Id && x.IdempotencyKey == key);
    if (previous is not null) return Results.Ok(previous);
    var raid = await db.Raids.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
    if (raid is null) return Results.NotFound();
    if (raid.StartsAt <= DateTimeOffset.UtcNow.ToUnixTimeSeconds()) return Results.Conflict(new { error = "Raid already started." });
    if (await db.Reservations.AnyAsync(x => x.RaidId == id && x.PlayerId == player.Id && x.Active)) return Results.Conflict(new { error = "Player already registered." });
    var updated = await db.Raids.Where(x => x.Id == id && x.SeatsTaken < x.Capacity).ExecuteUpdateAsync(s => s.SetProperty(x => x.SeatsTaken, x => x.SeatsTaken + 1));
    if (updated == 0) return Results.Conflict(new { error = "Raid is full." });
    var reservation = new Reservation { RaidId = id, PlayerId = player.Id, IdempotencyKey = key };
    db.Reservations.Add(reservation); await db.SaveChangesAsync(); await tx.CommitAsync();
    return Results.Created($"/reservations/{reservation.Id}", reservation);
});
app.MapDelete("/reservations/{id:guid}", async (Guid id, HttpContext ctx, RaidsDb db) =>
{
    var player = await PlayerFor(ctx, db); if (player is null) return Results.Unauthorized();
    await using var tx = await db.Database.BeginTransactionAsync();
    var reservation = await db.Reservations.SingleOrDefaultAsync(x => x.Id == id && x.PlayerId == player.Id);
    if (reservation is null) return Results.NotFound();
    if (reservation.Active)
    {
        reservation.Active = false;
        await db.Raids.Where(x => x.Id == reservation.RaidId).ExecuteUpdateAsync(s => s.SetProperty(x => x.SeatsTaken, x => x.SeatsTaken - 1));
        await db.SaveChangesAsync(); await tx.CommitAsync();
    }
    return Results.NoContent();
});
app.Run();
public partial class Program { }
