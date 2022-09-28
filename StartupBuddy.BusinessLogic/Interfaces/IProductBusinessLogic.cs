using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IProductBusinessLogic
    {
        Task<ProductDto> CreateOrUpdate(ProductDto product);

        Task<ProductDto> GetByUserId();
    }
}