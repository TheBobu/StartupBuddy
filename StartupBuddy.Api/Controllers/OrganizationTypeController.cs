using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationTypeController : Controller
    {
        private readonly IOrganizationTypeBusinessLogic organizationTypeBusinessLogic;

        public OrganizationTypeController(IOrganizationTypeBusinessLogic organizationTypeBusinessLogic)
        {
            this.organizationTypeBusinessLogic = organizationTypeBusinessLogic;
        }

        [HttpGet("GetSuggestion")]
        public async Task<List<string>> SuggestOrganizationType()
        {
            return await organizationTypeBusinessLogic.SuggestOrganizationType();
        }
    }
}
