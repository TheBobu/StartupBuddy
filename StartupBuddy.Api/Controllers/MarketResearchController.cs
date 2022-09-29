using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketResearchController : Controller
    {
        private readonly IMarketResearchBusinessLogic marketResearchBusinessLogic;

        public MarketResearchController(IMarketResearchBusinessLogic marketResearchBusinessLogic)
        {
            this.marketResearchBusinessLogic = marketResearchBusinessLogic;
        }

        [HttpGet]
        public async Task<MarketResearchDto> GetProduct()
        {
            return await marketResearchBusinessLogic.GetByUserId();
        }

        [HttpPost]
        public async Task<MarketResearchDto> CreateOrUpdate(MarketResearchDto productDto)
        {
            return await marketResearchBusinessLogic.CreateOrUpdate(productDto);
        }
    }
}