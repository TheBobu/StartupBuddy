using StartupBuddy.Data.Repositories;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StartupBuddyContext startupBuddyContext;

        private IUserRepository userRepository;

        public IUserRepository UserRepository => userRepository ??= new UserRepository(startupBuddyContext);


        public UnitOfWork(StartupBuddyContext startupBuddyContext)
        {
            this.startupBuddyContext = startupBuddyContext;
        }

        public void Save()
        {
            startupBuddyContext.SaveChanges();
        }

        public void Dispose()
        {
            startupBuddyContext.Dispose();
        }
    }
}