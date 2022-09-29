using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class MarketResearchBusinessLogic : BaseBusinessLogic, IMarketResearchBusinessLogic
    {
        public MarketResearchBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper) : base(identityContext, unitOfWork, mapper)
        {
        }

        public async Task<MarketResearchDto> CreateOrUpdate(MarketResearchDto marketResearch)
        {
            marketResearch.CompanyId = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value).Id;
            if (marketResearch.Id == default)
            {
                var newMarketResearch = await unitOfWork.MarketResearchRepository.Add(mapper.Map<MarketResearch>(marketResearch));
                unitOfWork.Save();

                return mapper.Map<MarketResearchDto>(newMarketResearch);
            }
            else
            {
                var updatedMarketResearch = unitOfWork.MarketResearchRepository.Update(mapper.Map<MarketResearch>(marketResearch));
                unitOfWork.Save();

                return mapper.Map<MarketResearchDto>(marketResearch);
            }
        }

        public async Task<MarketResearchDto> GetByUserId()
        {
            var company = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value);

            if (company == null)
            {
                return null;
            }

            var markets = await unitOfWork.MarketResearchRepository.GetByPredicate(x => x.CompanyId == company.Id);

            return mapper.Map<MarketResearchDto>(markets.FirstOrDefault());
        }
    }
}