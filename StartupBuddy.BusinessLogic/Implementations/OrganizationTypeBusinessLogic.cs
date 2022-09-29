using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.Sections;
using StartupBuddy.Dtos.User;

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
            IBusinessModelBusinessLogic businessModelBusinessLogic,
            IProductBusinessLogic productBusinessLogic
            ) : base(identityContext, unitOfWork, mapper)
        {
            CompanyBusinessLogic = companyBusinessLogic;
            MarketResearchBusinessLogic = marketResearchBusinessLogic;
            BusinessModelBusinessLogic = businessModelBusinessLogic;
            ProductBusinessLogic = productBusinessLogic;
        }

        public ICompanyBusinessLogic CompanyBusinessLogic { get; }
        public IMarketResearchBusinessLogic MarketResearchBusinessLogic { get; }
        public IBusinessModelBusinessLogic BusinessModelBusinessLogic { get; }
        public IProductBusinessLogic ProductBusinessLogic { get; }

        public async Task<List<string>> SuggestOrganizationType()
        {
            var company = CompanyBusinessLogic.GetByUserId();
            var businessModel = await BusinessModelBusinessLogic.GetByUserId();
            var marketResearch = await MarketResearchBusinessLogic.GetByUserId();
            var product = await ProductBusinessLogic.GetByUserId();

            Dictionary<string, int> scores = new();
            scores.Add("SRL", 0);
            scores.Add("SA", 0);
            scores.Add("SCS", 0);
            scores.Add("SCA", 0);
            scores.Add("SNC", 0);
            scores.Add("PFA", 0);
            scores.Add("II", 0);
            scores.Add("ONG", 0);

            UpdateScoresByNumberOfEmployees(scores, company);
            UpdateScoresByCheckboxes(scores, company);
            UpdateScoresByFields(scores, company, marketResearch, businessModel, product);

            return scores.OrderByDescending(x => x.Value).Select(x => x.Key).Take(3).ToList();
        }
        private char[] delimiters = { ' ', '.', ',', ';', ':', '\n', '\t' };
        private void UpdateScoresByFields(Dictionary<string, int> scores, CompanyDto company, MarketResearchDto marketResearch, BusinessModelDto businessModel, ProductDto product)
        {
            var activities = company.SecondaryActivities.Split(delimiters);

            if(activities.Length <=5)
            {
                scores["PFA"] += 10;
                scores["II"] += 10;
                scores["SRL"] += 7;
                scores["SCS"] += 3;
                scores["SCA"] += 3;
                scores["SNC"] += 3;
                scores["SA"] += 3;
            }
            else
            {
                scores["SRL"] += 7;
                scores["SCS"] += 7;
                scores["SCA"] += 7;
                scores["SNC"] += 7;
                scores["SA"] += 10;
            }

            if (marketResearch != null)
            {
                if (marketResearch.Revenue != null)
                {
                    if (marketResearch.Revenue.Length < 10)
                    {
                        scores["ONG"] += 10;
                        scores["PFA"] += 4;
                        scores["II"] += 4;
                    }
                    else
                    {
                        scores["SRL"] += 7;
                        scores["SCS"] += 3;
                        scores["SCA"] += 3;
                        scores["SNC"] += 3;
                        scores["SA"] += 3;
                    }
                }
                else
                {
                    scores["ONG"] += 10;
                }

                if (marketResearch.Competitors != null)
                {
                    if (marketResearch.Competitors.Length < 10)
                    {
                        scores["ONG"] += 4;
                        scores["PFA"] += 4;
                        scores["II"] += 4;
                    }
                    else
                    {
                        scores["SRL"] += 7;
                        scores["SCS"] += 3;
                        scores["SCA"] += 3;
                        scores["SNC"] += 3;
                        scores["SA"] += 3;
                    }
                }
                else
                {
                    scores["ONG"] += 10;
                }
            }

            if (businessModel != null)
            {
                if (businessModel.RevenueStreams != null)
                {
                    scores["SRL"] += 5;
                    scores["SCS"] += 5;
                    scores["SCA"] += 5;
                    scores["SNC"] += 5;
                    scores["SA"] += 5;
                    scores["PFA"] += 5;
                    scores["II"] += 5;
                }
                else
                {
                    scores["ONG"] += 5;
                }

                if (businessModel.DiagramFileId != null)
                {
                    scores["SRL"] += 5;
                    scores["SCS"] += 5;
                    scores["SCA"] += 5;
                    scores["SNC"] += 5;
                    scores["SA"] += 5;
                    scores["PFA"] += 5;
                    scores["II"] += 5;
                }
            }

            if(product != null)
            {
                if (product.ProductType.ToLower().Contains("servic"))
                {
                    scores["SRL"] += 5;
                    scores["SCS"] += 5;
                    scores["SCA"] += 5;
                    scores["SNC"] += 5;
                    scores["SA"] += 5;
                    scores["PFA"] += 7;
                    scores["II"] += 6;
                }
                if (product.ProductType.ToLower().Contains("prod"))
                {
                    scores["SRL"] += 5;
                    scores["SCS"] += 5;
                    scores["SCA"] += 5;
                    scores["SNC"] += 5;
                    scores["SA"] += 5;
                    scores["PFA"] += 3;
                    scores["II"] += 3;
                }
                if (String.IsNullOrEmpty(product.ProductType))
                {
                    scores["ONG"] += 1;
                }
                else
                {
                    scores["SRL"] += 1;
                    scores["SCS"] += 1;
                    scores["SCA"] += 1;
                    scores["SNC"] += 1;
                    scores["SA"] += 1;
                    scores["PFA"] += 1;
                    scores["II"] += 1;
                }
            }
            else
            {
                scores["ONG"] += 4;
            }
        }

        private void UpdateScoresByNumberOfEmployees(Dictionary<string, int> scores, CompanyDto company)
        {
            if (company.NumberOfEmployees < 5)
            {
                scores["PFA"] += 10;
                scores["II"] += 10;
                scores["SRL"] += 5;
                scores["ONG"] += 3;
            }
            if (company.NumberOfEmployees < 3)
            {
                scores["PFA"] += 10;
                scores["II"] += 10;
                scores["SRL"] += 1;
            }
            if (company.NumberOfEmployees > 5)
            {
                scores["SRL"] += 10;
                scores["SCS"] += 8;
                scores["SCA"] += 8;
                scores["SNC"] += 8;
                scores["SA"] += 5;
                scores["ONG"] += 8;
            }
            if (company.NumberOfEmployees > 15)
            {
                scores["SCS"] += 5;
                scores["SCA"] += 7;
                scores["SNC"] += 7;
                scores["SRL"] += 7;
                scores["SA"] += 10;
                scores["ONG"] += 3;
            }
            if (company.NumberOfEmployees > 35)
            {
                scores["SA"] += 15;
            }
            
        }

        private void UpdateScoresByCheckboxes(Dictionary<string, int> scores, CompanyDto company)
        {
            if (company.Employees)
            {
                scores["SRL"] += 5;
                scores["SCS"] += 5;
                scores["SCA"] += 5;
                scores["SNC"] += 5;
                scores["SA"] += 5;
            }
            else
            {
                scores["PFA"] += 5;
                scores["II"] += 5;
                scores["ONG"] += 5;
            }
            if (company.Accountant)
            {
                scores["SRL"] += 5;
                scores["SCS"] += 5;
                scores["SCA"] += 5;
                scores["SNC"] += 5;
                scores["SA"] += 5;
            }
            else
            {
                scores["PFA"] += 5;
                scores["II"] += 5;
                scores["ONG"] += 5;
            }
            if (company.StockMarket)
            {
                scores["SCS"] += 5;
                scores["SCA"] += 5;
                scores["SNC"] += 5;
                scores["SA"] += 5;
            }
            else
            {
                scores["PFA"] += 5;
                scores["II"] += 5;
                scores["SRL"] += 5;
                scores["ONG"] += 5;
            }
        }
    }
}