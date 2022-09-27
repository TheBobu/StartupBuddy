using Microsoft.Extensions.DependencyInjection;
using StartupBuddy.BusinessLogic.Implementations;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Data;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.BusinessLogic
{
    public static class ContainerConfig
    {
        public static IServiceCollection AddDependencies(this IServiceCollection services)
        {
            services.AddSingleton<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserBusinessLogic, UserBusinessLogic>();

            return services;
        }
    }
}