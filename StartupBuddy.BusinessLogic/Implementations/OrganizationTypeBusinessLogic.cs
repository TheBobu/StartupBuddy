using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class OrganizationTypeBusinessLogic : BaseBusinessLogic, IOrganizationTypeBusinessLogic
    {
        public OrganizationTypeBusinessLogic(
            IIdentityContext identityContext, 
            IUnitOfWork unitOfWork, 
            IMapper mapper,
            ICompanyBusinessLogic companyBusinessLogic,
            IMarketResearchBusinessLogic marketResearchBusinessLogic, 
            IProductBusinessLogic productBusinessLogic
            ) : base(identityContext, unitOfWork, mapper)
        {
            CompanyBusinessLogic = companyBusinessLogic;
            MarketResearchBusinessLogic = marketResearchBusinessLogic;
            ProductBusinessLogic = productBusinessLogic;
        }

        public ICompanyBusinessLogic CompanyBusinessLogic { get; }
        public IMarketResearchBusinessLogic MarketResearchBusinessLogic { get; }
        public IProductBusinessLogic ProductBusinessLogic { get; }

        public Task<List<string>> SuggestOrganizationType()
        {
            throw new NotImplementedException();
        }
    }
}