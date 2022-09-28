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
            services.AddSingleton<IIdentityContext, IdentityContext>();

            services.AddSingleton<IUnitOfWork, UnitOfWork>();

            services.AddScoped<IUserBusinessLogic, UserBusinessLogic>();
            services.AddScoped<ICompanyBusinessLogic, CompanyBusinessLogic>();
            services.AddScoped<IProductBusinessLogic, ProductBusinessLogic>();

            return services;
        }
    }
}