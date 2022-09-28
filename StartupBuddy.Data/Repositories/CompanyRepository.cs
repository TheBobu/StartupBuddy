using Microsoft.EntityFrameworkCore;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class CompanyRepository : BaseRepository<Company, int>, ICompanyRepository
    {
        public CompanyRepository(StartupBuddyContext context) : base(context)
        {
        }

        public Company GetByUserId(int userId)
        {
            return DbContext.Set<Company>().Where(x => x.UserId == userId).Include(x => x.LogoFile).Include(x => x.Members).FirstOrDefault();
        }
    }
}