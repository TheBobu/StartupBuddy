using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    internal class MemberRepository : BaseRepository<Member, int>, IMemberRepository
    {
        public MemberRepository(StartupBuddyContext context) : base(context)
        {
        }

        public void DeleteMembersByCompanyId(int companyId)
        {
            var members = DbContext.Members.Where(x => x.CompanyId == companyId).ToList();

            DbContext.RemoveRange(members);
        }
    }
}