using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace StartupBuddy.Data
{
    public static class MigrateDatabaseExtensions
    {
        public static IHost MigrateDatabase<TDbContext>(this IHost webHost) where TDbContext : DbContext
        {
            using (IServiceScope scope = webHost.Services.CreateScope())
            {
                IServiceProvider services = scope.ServiceProvider;
                try
                {
                    var context = scope.ServiceProvider.GetRequiredService<TDbContext>();
                    if (context == null)
                        Console.WriteLine("Error migrating database.");
                    context.Database.Migrate();
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                    throw;
                }
            }
            return webHost;
        }
    }
}