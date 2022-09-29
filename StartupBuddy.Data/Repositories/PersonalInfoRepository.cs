using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class PersonalInfoRepository : BaseRepository<PersonalInfo, int>, IPersonalInfoRepository
    {
        public PersonalInfoRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}