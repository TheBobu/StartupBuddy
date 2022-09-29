using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.User;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonalInfoController : Controller
    {
        private readonly IPersonalInfoBusinessLogic personalInfoBusinessLogic;

        public PersonalInfoController(IPersonalInfoBusinessLogic personalInfoBusinessLogic)
        {
            this.personalInfoBusinessLogic = personalInfoBusinessLogic;
        }

        [HttpGet]
        public async Task<PersonalInfoDto> GetPersonalInfo()
        {
            return await personalInfoBusinessLogic.GetByUserId();
        }

        [HttpPost]
        public async Task<PersonalInfoDto> CreateOrUpdate(PersonalInfoDto personalInfo)
        {
            return await personalInfoBusinessLogic.CreateOrUpdate(personalInfo);
        }
    }
}