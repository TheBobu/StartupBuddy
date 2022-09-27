using Microsoft.EntityFrameworkCore;
using StartupBuddy.Domain.Entities;

namespace StartupBuddy.Data
{
    public class StartupBuddyContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }

        public StartupBuddyContext(DbContextOptions<StartupBuddyContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>()
            .HasIndex(u => u.Email)
            .IsUnique();
        }
    }
}