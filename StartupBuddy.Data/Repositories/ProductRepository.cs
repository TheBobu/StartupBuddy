using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class ProductRepository : BaseRepository<Product, int>, IProductRepository
    {
        public ProductRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}