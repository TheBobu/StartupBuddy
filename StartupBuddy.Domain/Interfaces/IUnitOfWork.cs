namespace StartupBuddy.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        IBusinessModelRepository BusinessModelRepository { get; }
        ICompanyRepository CompanyRepository { get; }
        IFileRepository FileRepository { get; }
        IMarketResearchRepository MarketResearchRepository { get; }
        IMemberRepository MemberRepository { get; }
        IProductRepository ProductRepository { get; }
        ISocialMediaRepository SocialMediaRepository { get; }
        IUserRepository UserRepository { get; }
        void Dispose();

        void Save();
    }
}