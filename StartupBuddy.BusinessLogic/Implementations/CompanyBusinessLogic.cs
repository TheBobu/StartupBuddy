using AutoMapper;
using Microsoft.AspNetCore.Http;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.File;
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
                company.LogoFile = GetFileFromIFormFile(company.LogoFormFile);

                var file = await unitOfWork.FileRepository.Add(mapper.Map<File>(company.LogoFile));
                company.LogoFileId = file.Id;

                var newCompany = mapper.Map<CompanyDto>(await unitOfWork.CompanyRepository.Add(mapper.Map<Company>(company)));
                unitOfWork.Save();

                return newCompany;
            }
            else
            {
                if (company.LogoFormFile != null)
                {
                    company.LogoFile = GetFileFromIFormFile(company.LogoFormFile);

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
                
                var updatedCompany = mapper.Map<CompanyDto>(unitOfWork.CompanyRepository.Update(mapper.Map<Company>(company)));
                unitOfWork.Save();

                return updatedCompany;
            }
        }

        public CompanyDto GetById(int id)
        {
            return mapper.Map<CompanyDto>(unitOfWork.CompanyRepository.Get(id));
        }

        private FileDto GetFileFromIFormFile(IFormFile file)
        {
            using (var memoryStream = new MemoryStream())
            {
                file.CopyTo(memoryStream);
                var fileBytes = memoryStream.ToArray();
                string content = Convert.ToBase64String(fileBytes);

                return new FileDto
                {
                    ContentType = file.ContentType,
                    Name = file.Name,
                    Size = file.Length,
                    Content = content
                };
            }
        }
    }
}