using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.User;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : Controller
    {
        private readonly ICompanyBusinessLogic companyBusinessLogic;

        public CompanyController(ICompanyBusinessLogic companyBusinessLogic)
        {
            this.companyBusinessLogic = companyBusinessLogic;
        }

        [HttpGet("{companyId}")]
        public CompanyDto GetCompany(int companyId)
        {
            return companyBusinessLogic.GetById(companyId);
        }

        [HttpPost]
        public async Task<CompanyDto> CreateOrUpdateCompany(CompanyDto companyDto)
        {
            return await companyBusinessLogic.CreateOrUpdate(companyDto);
        }
    }
}
