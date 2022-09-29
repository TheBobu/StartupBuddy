using StartupBuddy.Domain.Entities;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IBusinessModelRepository : IBaseRepository<BusinessModel, int>
    {
        public BusinessModel GetByCompanyId(int companyId);
    }
}