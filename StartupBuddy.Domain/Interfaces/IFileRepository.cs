using File = StartupBuddy.Domain.Entities.File;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IFileRepository : IBaseRepository<File, int>
    {
    }
}