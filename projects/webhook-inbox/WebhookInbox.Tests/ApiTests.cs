using System.Net;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using WebhookInbox;

public sealed class TestClock : TimeProvider
{
    public DateTimeOffset Now { get; set; } = DateTimeOffset.UtcNow;
    public override DateTimeOffset GetUtcNow() => Now;
}
public sealed class ApiTests : IDisposable
{
    private readonly string file = Path.Combine(Path.GetTempPath(), $"inbox-{Guid.NewGuid()}.db");
    private readonly WebApplicationFactory<Program> factory;
    private readonly TestClock clock = new();
    public ApiTests() => factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b => b.UseEnvironment("Development")
        .UseSetting("ConnectionStrings:Database", $"Data Source={file};Default Timeout=30").UseSetting("Worker:Enabled", "false")
        .ConfigureServices(s => s.AddSingleton<TimeProvider>(clock)));
    private Task<HttpResponseMessage> Send(HttpClient c, string id, string body, long? timestamp = null, string? signature = null)
    {
        var time = timestamp ?? clock.Now.ToUnixTimeSeconds();
        var req = new HttpRequestMessage(HttpMethod.Post, "/webhooks") { Content = new StringContent(body, Encoding.UTF8, "application/json") };
        req.Headers.Add("X-Event-Id", id); req.Headers.Add("X-Timestamp", time.ToString());
        req.Headers.Add("X-Signature", signature ?? Signature.Sign("local-demo-webhook-secret", time, id, body));
        return c.SendAsync(req);
    }
    private async Task<bool> Process()
    {
        using var scope = factory.Services.CreateScope();
        return await scope.ServiceProvider.GetRequiredService<InboxProcessor>().ProcessNext();
    }
    [Fact]
    public async Task Concurrent_duplicate_deliveries_produce_one_persistent_effect()
    {
        using var c = factory.CreateClient(); const string body = "{\"type\":\"points.awarded\",\"player\":\"neo\",\"points\":25}";
        var responses = await Task.WhenAll(Enumerable.Range(0, 10).Select(_ => Send(c, "event-1", body)));
        Assert.All(responses, r => Assert.Equal(HttpStatusCode.Accepted, r.StatusCode));
        Assert.True(await Process()); Assert.False(await Process());
        using var scope = factory.Services.CreateScope(); var db = scope.ServiceProvider.GetRequiredService<InboxDb>();
        Assert.Equal(1, await db.Events.CountAsync()); Assert.Equal(1, await db.Awards.CountAsync());
        Assert.Equal("Completed", (await db.Events.SingleAsync()).Status);
    }
    [Fact]
    public async Task Reused_id_with_changed_payload_is_rejected()
    {
        using var c = factory.CreateClient();
        Assert.Equal(HttpStatusCode.Accepted, (await Send(c, "event-1", "{\"points\":1}")).StatusCode);
        Assert.Equal(HttpStatusCode.Conflict, (await Send(c, "event-1", "{\"points\":2}")).StatusCode);
    }
    [Fact]
    public async Task Pending_event_survives_application_restart()
    {
        using (var client = factory.CreateClient())
            Assert.Equal(HttpStatusCode.Accepted, (await Send(client, "restart", "{\"type\":\"points.awarded\",\"player\":\"neo\",\"points\":25}")).StatusCode);
        factory.Dispose();
        using var restarted = new WebApplicationFactory<Program>().WithWebHostBuilder(b => b.UseEnvironment("Development")
            .UseSetting("ConnectionStrings:Database", $"Data Source={file}").UseSetting("Worker:Enabled", "false"));
        using var scope = restarted.Services.CreateScope();
        Assert.True(await scope.ServiceProvider.GetRequiredService<InboxProcessor>().ProcessNext());
        Assert.Equal(1, await scope.ServiceProvider.GetRequiredService<InboxDb>().Awards.CountAsync());
    }
    [Fact]
    public async Task Invalid_and_expired_signatures_are_rejected()
    {
        using var c = factory.CreateClient();
        Assert.Equal(HttpStatusCode.Unauthorized, (await Send(c, "bad", "{}", signature: "00")).StatusCode);
        Assert.Equal(HttpStatusCode.Unauthorized, (await Send(c, "old", "{}", timestamp: clock.Now.AddMinutes(-6).ToUnixTimeSeconds())).StatusCode);
    }
    [Fact]
    public async Task Failure_backs_off_then_enters_dead_letter_after_three_attempts()
    {
        using var c = factory.CreateClient(); await Send(c, "fail", "{\"type\":\"unsupported\"}");
        Assert.True(await Process()); Assert.False(await Process());
        clock.Now = clock.Now.AddSeconds(3); Assert.True(await Process());
        clock.Now = clock.Now.AddSeconds(5); Assert.True(await Process());
        clock.Now = clock.Now.AddHours(1); Assert.False(await Process());
        using var scope = factory.Services.CreateScope(); var db = scope.ServiceProvider.GetRequiredService<InboxDb>();
        var evt = await db.Events.SingleAsync(); Assert.Equal("DeadLetter", evt.Status); Assert.Equal(3, evt.Attempts);
        Assert.Empty(await db.Awards.ToListAsync());
    }
    public void Dispose() { factory.Dispose(); SqliteConnection.ClearAllPools(); File.Delete(file); }
}
