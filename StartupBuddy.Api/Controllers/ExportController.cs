using Microsoft.AspNetCore.Mvc;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Dtos.File;

namespace StartupBuddy.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExportController : Controller
    {
        public ExportController(IExportBusinessLogic exportBusinessLogic)
        {
            ExportBusinessLogic = exportBusinessLogic;
        }

        public IExportBusinessLogic ExportBusinessLogic { get; }

        [HttpGet("GenerateArchive")]
        public async Task<FileDto> GenerateZip()
        {
            return await ExportBusinessLogic.ExportToZip();
        }
    }
}
