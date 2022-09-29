using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessModelController : Controller
    {

        private readonly IBusinessModelBusinessLogic businessModelBusinessLogic;

        public BusinessModelController(IBusinessModelBusinessLogic businessModelBusinessLogic)
        {
            this.businessModelBusinessLogic = businessModelBusinessLogic;
        }

        [HttpGet]
        public async Task<BusinessModelDto> GetBusinessModel()
        {
            return await businessModelBusinessLogic.GetByUserId();
        }

        [HttpPost]
        public async Task<BusinessModelDto> CreateOrUpdate(BusinessModelDto businessModel)
        {
            return await businessModelBusinessLogic.CreateOrUpdate(businessModel);
        }

        [HttpPost("UploadFile")]
        public async Task<BusinessModelDto> UploadFile(IFormFile formFile)
        {
            return await businessModelBusinessLogic.UploadFile(formFile);
        }
    }
}
