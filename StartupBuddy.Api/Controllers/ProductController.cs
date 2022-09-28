using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : Controller
    {
        private readonly IProductBusinessLogic productBusinessLogic;

        public ProductController(IProductBusinessLogic productBusinessLogic)
        {
            this.productBusinessLogic = productBusinessLogic;
        }

        [HttpGet]
        public async Task<ProductDto> GetProduct()
        {
            return await productBusinessLogic.GetByUserId();
        }

        [HttpPost]
        public async Task<ProductDto> CreateOrUpdate(ProductDto productDto)
        {
            return await productBusinessLogic.CreateOrUpdate(productDto);
        }
    }
}
