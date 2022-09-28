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

        public Company GetById(int id)
        {
            return DbContext.Set<Company>().Where(x => x.Id == id).Include(x => x.LogoFile).Include(x => x.Members).FirstOrDefault();
        }
    }
}