using System.Net;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;

public sealed class ApiTests : IDisposable
{
    private readonly string file = Path.Combine(Path.GetTempPath(), $"raids-{Guid.NewGuid()}.db");
    private readonly WebApplicationFactory<Program> factory;
    public ApiTests() => factory = new WebApplicationFactory<Program>().WithWebHostBuilder(b => b.UseEnvironment("Development").UseSetting("ConnectionStrings:Database", $"Data Source={file};Default Timeout=30"));
    private async Task<string> Player(HttpClient c)
    {
        var r = await c.PostAsJsonAsync("/players", new { name = "Neo" });
        return (await r.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("token").GetString()!;
    }
    private async Task<Guid> Raid(HttpClient c, int capacity = 1)
    {
        using var req = new HttpRequestMessage(HttpMethod.Post, "/raids") { Content = JsonContent.Create(new { name = "Legendary raid", capacity, startsAt = DateTimeOffset.UtcNow.AddHours(1).ToUnixTimeSeconds() }) };
        req.Headers.Add("X-Admin-Key", "local-demo-admin-key");
        var r = await c.SendAsync(req); Assert.Equal(HttpStatusCode.Created, r.StatusCode);
        return (await r.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("id").GetGuid();
    }
    private static Task<HttpResponseMessage> Book(HttpClient c, Guid raid, string token, string key)
    {
        var req = new HttpRequestMessage(HttpMethod.Post, $"/raids/{raid}/reservations");
        req.Headers.Add("X-Player-Token", token); req.Headers.Add("Idempotency-Key", key);
        return c.SendAsync(req);
    }
    [Fact]
    public async Task Twenty_concurrent_players_cannot_overbook_one_seat()
    {
        using var c = factory.CreateClient(); var raid = await Raid(c);
        var tokens = new List<string>(); for (var i = 0; i < 20; i++) tokens.Add(await Player(c));
        var responses = await Task.WhenAll(tokens.Select(t => Book(c, raid, t, Guid.NewGuid().ToString())));
        Assert.Equal(1, responses.Count(r => r.StatusCode == HttpStatusCode.Created));
        Assert.Equal(19, responses.Count(r => r.StatusCode == HttpStatusCode.Conflict));
        var state = await c.GetFromJsonAsync<JsonElement>($"/raids/{raid}"); Assert.Equal(1, state.GetProperty("seatsTaken").GetInt32());
    }
    [Fact]
    public async Task Repeated_booking_and_cancellation_do_not_change_counter_twice()
    {
        using var c = factory.CreateClient(); var raid = await Raid(c); var token = await Player(c);
        var first = await Book(c, raid, token, "same-request");
        var id = (await first.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("id").GetGuid();
        var replay = await Book(c, raid, token, "same-request");
        Assert.Equal(HttpStatusCode.OK, replay.StatusCode);
        Assert.Equal(id, (await replay.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("id").GetGuid());
        c.DefaultRequestHeaders.Add("X-Player-Token", token);
        Assert.Equal(HttpStatusCode.NoContent, (await c.DeleteAsync($"/reservations/{id}")).StatusCode);
        Assert.Equal(HttpStatusCode.NoContent, (await c.DeleteAsync($"/reservations/{id}")).StatusCode);
        Assert.Equal(0, (await c.GetFromJsonAsync<JsonElement>($"/raids/{raid}")).GetProperty("seatsTaken").GetInt32());
    }
    [Fact]
    public async Task Another_player_cannot_cancel_reservation()
    {
        using var c = factory.CreateClient(); var raid = await Raid(c);
        var first = await Book(c, raid, await Player(c), "a"); var id = (await first.Content.ReadFromJsonAsync<JsonElement>()).GetProperty("id").GetGuid();
        c.DefaultRequestHeaders.Add("X-Player-Token", await Player(c));
        Assert.Equal(HttpStatusCode.NotFound, (await c.DeleteAsync($"/reservations/{id}")).StatusCode);
        Assert.Equal(1, (await c.GetFromJsonAsync<JsonElement>($"/raids/{raid}")).GetProperty("seatsTaken").GetInt32());
    }
    public void Dispose() { factory.Dispose(); SqliteConnection.ClearAllPools(); File.Delete(file); }
}
