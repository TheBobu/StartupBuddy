using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediaController : Controller
    {
        private readonly ISocialMediaBusinessLogic socialMediaBusinessLogic;

        public SocialMediaController(ISocialMediaBusinessLogic socialMediaBusinessLogic)
        {
            this.socialMediaBusinessLogic = socialMediaBusinessLogic;
        }

        [HttpGet]
        public async Task<SocialMediaDto> GetProduct()
        {
            return await socialMediaBusinessLogic.GetByUserId();
        }

        [HttpPost]
        public async Task<SocialMediaDto> CreateOrUpdate(SocialMediaDto productDto)
        {
            return await socialMediaBusinessLogic.CreateOrUpdate(productDto);
        }
    }
}
