using StartupBuddy.Domain.Entities;

namespace StartupBuddy.Domain.Interfaces
{
    public interface ICompanyRepository : IBaseRepository<Company, int>
    {
        Company GetByUserId(int id);
    }
}