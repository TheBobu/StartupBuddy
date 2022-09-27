using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    internal class MemberRepository : BaseRepository<Member, int>, IMemberRepository
    {
        public MemberRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}