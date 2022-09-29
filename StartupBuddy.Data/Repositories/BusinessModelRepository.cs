using Microsoft.EntityFrameworkCore;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class BusinessModelRepository : BaseRepository<BusinessModel, int>, IBusinessModelRepository
    {
        public BusinessModelRepository(StartupBuddyContext context) : base(context)
        {
        }

        public BusinessModel GetByCompanyId(int companyId)
        {
            return DbContext.BusinessModels.Where(x => x.CompanyId.Equals(companyId)).Include(x => x.DiagramFile).FirstOrDefault();
        }
    }
}