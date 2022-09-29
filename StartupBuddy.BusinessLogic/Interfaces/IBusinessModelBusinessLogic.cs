using Microsoft.AspNetCore.Http;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IBusinessModelBusinessLogic
    {
        Task<BusinessModelDto> CreateOrUpdate(BusinessModelDto businessModel);

        Task<BusinessModelDto> UploadFile(IFormFile formFile);

        Task<BusinessModelDto> GetByUserId();
    }
}