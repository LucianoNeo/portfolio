using Microsoft.EntityFrameworkCore;

namespace NeoTasks;

public sealed class User
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
    public string Role { get; set; } = "Member";
}
public sealed class Organization
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public string Name { get; set; } = "";
}
public sealed class WorkProject
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public string Name { get; set; } = "";
}
public sealed class WorkTask
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public Guid ProjectId { get; set; }
    public string Title { get; set; } = "";
    public bool Completed { get; set; }
    public int Version { get; set; } = 1;
}
public sealed class TimeEntry
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid OrganizationId { get; set; }
    public Guid TaskId { get; set; }
    public Guid UserId { get; set; }
    public int Seconds { get; set; }
}
public sealed class TasksDb(DbContextOptions<TasksDb> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Organization> Organizations => Set<Organization>();
    public DbSet<WorkProject> Projects => Set<WorkProject>();
    public DbSet<WorkTask> Tasks => Set<WorkTask>();
    public DbSet<TimeEntry> TimeEntries => Set<TimeEntry>();
    protected override void OnModelCreating(ModelBuilder b)
    {
        b.Entity<User>().HasIndex(x => x.Email).IsUnique();
        b.Entity<User>().HasOne<Organization>().WithMany().HasForeignKey(x => x.OrganizationId);
        b.Entity<WorkProject>().HasAlternateKey(x => new { x.Id, x.OrganizationId });
        b.Entity<WorkProject>().HasOne<Organization>().WithMany().HasForeignKey(x => x.OrganizationId);
        b.Entity<WorkTask>().HasOne<WorkProject>().WithMany().HasForeignKey(x => new { x.ProjectId, x.OrganizationId }).HasPrincipalKey(x => new { x.Id, x.OrganizationId });
        b.Entity<WorkTask>().HasAlternateKey(x => new { x.Id, x.OrganizationId });
        b.Entity<WorkTask>().Property(x => x.Version).IsConcurrencyToken();
        b.Entity<TimeEntry>().HasOne<WorkTask>().WithMany().HasForeignKey(x => new { x.TaskId, x.OrganizationId }).HasPrincipalKey(x => new { x.Id, x.OrganizationId });
        b.Entity<TimeEntry>().HasOne<User>().WithMany().HasForeignKey(x => x.UserId);
    }
}
public record RegisterRequest(string Organization, string Email, string Password);
public record LoginRequest(string Email, string Password);
public record MemberRequest(string Email, string Password);
public record ProjectRequest(string Name);
public record TaskRequest(string Title);
public record TaskUpdate(bool Completed, int Version);
public record TimeRequest(int Seconds);
