using Microsoft.EntityFrameworkCore;
namespace RaidBooking;
public sealed class Raid
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public int Capacity { get; set; }
    public int SeatsTaken { get; set; }
    public long StartsAt { get; set; }
}
public sealed class Player
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
    public string TokenHash { get; set; } = "";
}
public sealed class Reservation
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RaidId { get; set; }
    public Guid PlayerId { get; set; }
    public string IdempotencyKey { get; set; } = "";
    public bool Active { get; set; } = true;
}
public sealed class RaidsDb(DbContextOptions<RaidsDb> options) : DbContext(options)
{
    public DbSet<Raid> Raids => Set<Raid>();
    public DbSet<Player> Players => Set<Player>();
    public DbSet<Reservation> Reservations => Set<Reservation>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<Player>().HasIndex(x => x.TokenHash).IsUnique();
        b.Entity<Reservation>().HasIndex(x => new { x.RaidId, x.PlayerId, x.IdempotencyKey }).IsUnique();
        b.Entity<Reservation>().HasIndex(x => new { x.RaidId, x.PlayerId }).IsUnique().HasFilter("Active = 1");
        b.Entity<Reservation>().HasOne<Raid>().WithMany().HasForeignKey(x => x.RaidId);
        b.Entity<Reservation>().HasOne<Player>().WithMany().HasForeignKey(x => x.PlayerId);
        b.Entity<Raid>().ToTable(t => t.HasCheckConstraint("CK_Raid_Capacity", "Capacity > 0 AND SeatsTaken >= 0 AND SeatsTaken <= Capacity"));
    }
}
public record CreateRaid(string Name, int Capacity, long StartsAt);
public record CreatePlayer(string Name);
