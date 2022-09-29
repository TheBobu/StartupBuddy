using AutoMapper;
using Microsoft.AspNetCore.Http;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.Sections;
using File = StartupBuddy.Domain.Entities.File;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class BusinessModelBusinessLogic : BaseBusinessLogic, IBusinessModelBusinessLogic
    {
        public BusinessModelBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper) : base(identityContext, unitOfWork, mapper)
        {
        }

        public async Task<BusinessModelDto> CreateOrUpdate(BusinessModelDto businessModel)
        {
            businessModel.CompanyId = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value).Id;

            if (businessModel.Id == default)
            {
                var newBm = await unitOfWork.BusinessModelRepository.Add(mapper.Map<BusinessModel>(businessModel));
                unitOfWork.Save();

                return mapper.Map<BusinessModelDto>(newBm);
            }
            else
            {
                var updatedBm = unitOfWork.BusinessModelRepository.Update(mapper.Map<BusinessModel>(businessModel));
                unitOfWork.Save();

                return mapper.Map<BusinessModelDto>(updatedBm);
            }
        }

        public async Task<BusinessModelDto> GetByUserId()
        {
            var company = unitOfWork.CompanyRepository.GetByUserId(identityContext.UserId.Value);

            if (company == null)
            {
                return null;
            }

            var bm = unitOfWork.BusinessModelRepository.GetByCompanyId(company.Id);

            return mapper.Map<BusinessModelDto>(bm);
        }

        public async Task<BusinessModelDto> UploadFile(IFormFile formFile)
        {
            if (formFile != null)
            {
                var LogoFile = formFile.GetFileFromIFormFile();
                var file = await unitOfWork.FileRepository.Add(mapper.Map<File>(LogoFile));
                var bm = GetByUserId();
                bm.Result.DiagramFileId = file.Id;
                var updatedBm = unitOfWork.BusinessModelRepository.Update(mapper.Map<BusinessModel>(bm));
                return mapper.Map<BusinessModelDto>(updatedBm);
            }

            return null;
        }
    }
}