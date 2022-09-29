using StartupBuddy.Dtos.User;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IPersonalInfoBusinessLogic
    {
        Task<PersonalInfoDto> CreateOrUpdate(PersonalInfoDto marketResearch);

        Task<PersonalInfoDto> GetByUserId();
    }
}