using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface ISocialMediaBusinessLogic
    {
        Task<SocialMediaDto> CreateOrUpdate(SocialMediaDto socialMedia);
        Task<SocialMediaDto> GetByUserId();
    }
}