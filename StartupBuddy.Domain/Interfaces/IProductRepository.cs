using StartupBuddy.Domain.Entities;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IProductRepository : IBaseRepository<Product, int>
    {
    }
}