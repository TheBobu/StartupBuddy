using AutoMapper;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.User;
using File = StartupBuddy.Domain.Entities.File;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class CompanyBusinessLogic : BaseBusinessLogic, ICompanyBusinessLogic
    {
        public CompanyBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper) : base(identityContext, unitOfWork, mapper)
        {
        }

        public async Task<CompanyDto> CreateOrUpdate(CompanyDto company)
        {
            if (company.Id != default)
            {
                company.UserId = identityContext.UserId.Value;

                if (company.LogoFormFile != null)
                {
                    company.LogoFile = company.LogoFormFile.GetFileFromIFormFile();
                    var file = await unitOfWork.FileRepository.Add(mapper.Map<File>(company.LogoFile));
                    company.LogoFileId = file.Id;
                }
                if (company.Members != null)
                {
                    await unitOfWork.MemberRepository.AddRange(mapper.Map<IEnumerable<Member>>(company.Members));
                }

                var newCompany = mapper.Map<CompanyDto>(await unitOfWork.CompanyRepository.Add(mapper.Map<Company>(company)));
                unitOfWork.Save();

                return newCompany;
            }
            else
            {
                if (company.LogoFormFile != null)
                {
                    company.LogoFile = company.LogoFormFile.GetFileFromIFormFile();

                    if (company.LogoFileId != default)
                    {
                        var file = await unitOfWork.FileRepository.Add(mapper.Map<File>(company.LogoFile));
                        company.LogoFileId = file.Id;
                    }
                    else
                    {
                        unitOfWork.FileRepository.Update(mapper.Map<File>(company.LogoFile));
                    }
                }

                if (company.Members != null)
                {
                    unitOfWork.MemberRepository.DeleteMembersByCompanyId(company.Id);
                    await unitOfWork.MemberRepository.AddRange(mapper.Map<IEnumerable<Member>>(company.Members));
                }

                var updatedCompany = mapper.Map<CompanyDto>(unitOfWork.CompanyRepository.Update(mapper.Map<Company>(company)));
                unitOfWork.Save();

                return updatedCompany;
            }
        }

        public CompanyDto GetByUserId()
        {
            return mapper.Map<CompanyDto>(unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value));
        }
    }
}