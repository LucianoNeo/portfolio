using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using WebhookInbox;

var builder = WebApplication.CreateBuilder(args);
var secret = builder.Configuration["WebhookSecret"] ?? (builder.Environment.IsDevelopment() ? "local-demo-webhook-secret" : throw new InvalidOperationException("Set WebhookSecret."));
var adminKey = builder.Configuration["AdminKey"] ?? (builder.Environment.IsDevelopment() ? "local-demo-admin-key" : throw new InvalidOperationException("Set AdminKey."));
if (secret.Length < 16 || adminKey.Length < 16) throw new InvalidOperationException("WebhookSecret and AdminKey must contain at least 16 characters.");
builder.Services.AddDbContext<InboxDb>(o => o.UseSqlite(builder.Configuration.GetConnectionString("Database") ?? "Data Source=inbox.db;Default Timeout=30"));
builder.Services.AddSingleton(TimeProvider.System);
builder.Services.AddScoped<InboxProcessor>();
if (builder.Configuration["Worker:Enabled"] != "false") builder.Services.AddHostedService<InboxWorker>();
builder.Services.AddProblemDetails(); builder.Services.AddOpenApi();
builder.WebHost.ConfigureKestrel(o => o.Limits.MaxRequestBodySize = 65536);
var app = builder.Build(); app.UseExceptionHandler();
using (var scope = app.Services.CreateScope()) scope.ServiceProvider.GetRequiredService<InboxDb>().Database.EnsureCreated();
if (app.Environment.IsDevelopment()) app.MapOpenApi();
app.MapGet("/health", () => Results.Ok(new { status = "ok" }));
app.MapPost("/webhooks", async (HttpContext ctx, InboxDb db, TimeProvider clock) =>
{
    var id = ctx.Request.Headers["X-Event-Id"].ToString();
    if (string.IsNullOrWhiteSpace(id) || id.Length > 100) return Results.BadRequest(new { error = "X-Event-Id required (max 100 characters)." });
    if (!long.TryParse(ctx.Request.Headers["X-Timestamp"], out var timestamp)) return Results.Unauthorized();
    using var reader = new StreamReader(ctx.Request.Body, Encoding.UTF8);
    var body = await reader.ReadToEndAsync(ctx.RequestAborted);
    if (Encoding.UTF8.GetByteCount(body) > 65536) return Results.StatusCode(413);
    if (!Signature.Valid(secret, timestamp, id, body, ctx.Request.Headers["X-Signature"].ToString(), clock.GetUtcNow().ToUnixTimeSeconds())) return Results.Unauthorized();
    var hash = Convert.ToHexString(SHA256.HashData(Encoding.UTF8.GetBytes(body)));
    // Deduplication and insert share a transaction so parallel deliveries observe the same record.
    await using var tx = await db.Database.BeginTransactionAsync();
    var existing = await db.Events.FindAsync(id);
    if (existing is not null) return existing.PayloadHash == hash ? Results.Accepted($"/events/{id}", new { id, duplicate = true }) : Results.Conflict(new { error = "Event ID already used with a different payload." });
    db.Events.Add(new InboxEvent { Id = id, Payload = body, PayloadHash = hash, AvailableAt = clock.GetUtcNow().ToUnixTimeSeconds() });
    await db.SaveChangesAsync(); await tx.CommitAsync();
    return Results.Accepted($"/events/{id}", new { id, duplicate = false });
});
app.MapGet("/events/{id}", async (string id, HttpContext ctx, InboxDb db) =>
{
    if (!CryptographicOperations.FixedTimeEquals(Encoding.UTF8.GetBytes(ctx.Request.Headers["X-Admin-Key"].ToString()), Encoding.UTF8.GetBytes(adminKey))) return Results.Unauthorized();
    var evt = await db.Events.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
    return evt is null ? Results.NotFound() : Results.Ok(new { evt.Id, evt.Status, evt.Attempts, evt.LastError });
});
app.Run();
public partial class Program { }
