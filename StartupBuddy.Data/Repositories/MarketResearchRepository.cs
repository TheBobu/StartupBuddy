using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    internal class MarketResearchRepository : BaseRepository<MarketResearch, int>, IMarketResearchRepository
    {
        public MarketResearchRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}