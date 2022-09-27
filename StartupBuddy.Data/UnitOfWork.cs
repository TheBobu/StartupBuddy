using StartupBuddy.Data.Repositories;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StartupBuddyContext startupBuddyContext;

        private IUserRepository userRepository;

        public UnitOfWork(StartupBuddyContext startupBuddyContext)
        {
            this.startupBuddyContext = startupBuddyContext;
        }

        public IBusinessModelRepository BusinessModelRepository => new BusinessModelRepository(startupBuddyContext);
        public ICompanyRepository CompanyRepository => new CompanyRepository(startupBuddyContext);
        public IFileRepository FileRepository => new FileRepository(startupBuddyContext);
        public IMarketResearchRepository MarketResearchRepository => new MarketResearchRepository(startupBuddyContext);
        public IMemberRepository MemberRepository => new MemberRepository(startupBuddyContext);
        public IProductRepository ProductRepository => new ProductRepository(startupBuddyContext);
        public ISocialMediaRepository SocialMediaRepository => new SocialMediaRepository(startupBuddyContext);
        public IUserRepository UserRepository => userRepository ??= new UserRepository(startupBuddyContext);
        public void Dispose()
        {
            startupBuddyContext.Dispose();
        }

        public void Save()
        {
            startupBuddyContext.SaveChanges();
        }
    }
}