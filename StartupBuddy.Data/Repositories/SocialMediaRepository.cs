using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class SocialMediaRepository : BaseRepository<SocialMedia, int>, ISocialMediaRepository
    {
        public SocialMediaRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}