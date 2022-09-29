using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class SocialMediaBusinessLogic : BaseBusinessLogic, ISocialMediaBusinessLogic
    {
        public SocialMediaBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper) : base(identityContext, unitOfWork, mapper)
        {
        }

        public async Task<SocialMediaDto> CreateOrUpdate(SocialMediaDto socialMedia)
        {
            socialMedia.CompanyId = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value).Id;
            if (socialMedia.Id == default)
            {
                var newSocialMedia = await unitOfWork.SocialMediaRepository.Add(mapper.Map<SocialMedia>(socialMedia));
                unitOfWork.Save();

                return mapper.Map<SocialMediaDto>(newSocialMedia);
            }
            else
            {
                var updatedSocialMedia = unitOfWork.SocialMediaRepository.Update(mapper.Map<SocialMedia>(socialMedia));
                unitOfWork.Save();

                return mapper.Map<SocialMediaDto>(updatedSocialMedia);
            }
        }

        public async Task<SocialMediaDto> GetByUserId()
        {
            var company = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value);

            if (company == null)
            {
                return null;
            }

            var socialMedia = await unitOfWork.SocialMediaRepository.GetByPredicate(x => x.CompanyId == company.Id);

            return mapper.Map<SocialMediaDto>(socialMedia.FirstOrDefault());
        }
    }
}