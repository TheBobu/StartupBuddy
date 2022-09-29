using StartupBuddy.Dtos.File;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IExportBusinessLogic
    {
        Task<FileDto> ExportToZip();
    }
}