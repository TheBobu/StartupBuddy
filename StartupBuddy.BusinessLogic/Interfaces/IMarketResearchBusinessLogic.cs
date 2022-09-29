using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IMarketResearchBusinessLogic
    {
        Task<MarketResearchDto> CreateOrUpdate(MarketResearchDto marketResearch);

        Task<MarketResearchDto> GetByUserId();
    }
}