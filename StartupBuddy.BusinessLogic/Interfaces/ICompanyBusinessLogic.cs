using StartupBuddy.Dtos.User;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface ICompanyBusinessLogic
    {
        Task<CompanyDto> CreateOrUpdate(CompanyDto company);
        CompanyDto GetById(int id);
    }
}