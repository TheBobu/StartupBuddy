using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class ProductBusinessLogic : BaseBusinessLogic, IProductBusinessLogic
    {
        public ProductBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper):base(identityContext, unitOfWork, mapper)
        {
        }

        public async Task<ProductDto> CreateOrUpdate(ProductDto product)
        {
            product.CompanyId = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value).Id;
            if (product.Id == default)
            {
                var newProduct = await unitOfWork.ProductRepository.Add(mapper.Map<Product>(product));
                unitOfWork.Save();

                return mapper.Map<ProductDto>(newProduct);
            }
            else
            {
                var updatedProduct = unitOfWork.ProductRepository.Update(mapper.Map<Product>(product));
                unitOfWork.Save();

                return mapper.Map<ProductDto>(updatedProduct);
            }
        }

        public async Task<ProductDto> GetByUserId()
        {
            var company = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value);

            if(company == null)
            {
                return null;
            }

            var product = await unitOfWork.ProductRepository.GetByPredicate(x=>x.CompanyId == company.Id);

            return mapper.Map<ProductDto>(product.FirstOrDefault());
        }
    }
}