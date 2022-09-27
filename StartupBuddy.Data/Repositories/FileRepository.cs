using StartupBuddy.Domain.Interfaces;
using File = StartupBuddy.Domain.Entities.File;

namespace StartupBuddy.Data.Repositories
{
    public class FileRepository : BaseRepository<File, int>, IFileRepository
    {
        public FileRepository(StartupBuddyContext context) : base(context)
        {
        }
    }
}