using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class CompanyRepository : BaseRepository<Company, int>, ICompanyRepository
    {
        public CompanyRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}