using Microsoft.EntityFrameworkCore;
using StartupBuddy.Domain.Entities;
using File = StartupBuddy.Domain.Entities.File;

namespace StartupBuddy.Data
{
    public class StartupBuddyContext : DbContext
    {
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<Company> Companies { get; set; }
        public virtual DbSet<File> Files { get; set; }
        public virtual DbSet<MarketResearch> MarketResearches { get; set; }
        public virtual DbSet<Member> Members { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<SocialMedia> SocialMedias { get; set; }
        public virtual DbSet<BusinessModel> BusinessModels { get; set; }

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