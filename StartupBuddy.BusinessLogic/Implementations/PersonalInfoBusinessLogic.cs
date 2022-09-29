using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.Sections;
using StartupBuddy.Dtos.User;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class PersonalInfoBusinessLogic : BaseBusinessLogic, IPersonalInfoBusinessLogic
    {
        public PersonalInfoBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper) : base(identityContext, unitOfWork, mapper)
        {
        }

        public async Task<PersonalInfoDto> CreateOrUpdate(PersonalInfoDto personalInfo)
        {
            personalInfo.UserId = identityContext.UserId.Value;
            if (personalInfo.Id == default)
            {
                var newPersonalInfo = await unitOfWork.PersonalInfoRepository.Add(mapper.Map<PersonalInfo>(personalInfo));
                unitOfWork.Save();

                return mapper.Map<PersonalInfoDto>(newPersonalInfo);
            }
            else
            {
                var newPersonalInfo = unitOfWork.PersonalInfoRepository.Update(mapper.Map<PersonalInfo>(personalInfo));
                unitOfWork.Save();

                return mapper.Map<PersonalInfoDto>(newPersonalInfo);
            }
        }
        public async Task<PersonalInfoDto> GetByUserId()
        {

            var personalInfo = await unitOfWork.PersonalInfoRepository.GetByPredicate(x => x.UserId == identityContext.UserId.Value);

            return mapper.Map<PersonalInfoDto>(personalInfo.FirstOrDefault());
        }
    }
}
