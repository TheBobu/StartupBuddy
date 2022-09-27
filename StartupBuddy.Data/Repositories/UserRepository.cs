using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data.Repositories
{
    public class UserRepository : BaseRepository<User, int>, IUserRepository
    {
        public UserRepository(StartupBuddyContext context) : base(context)
        {
        }

        public User GetUserByEmail(string email)
        {
            return DbContext.Set<User>().FirstOrDefault(x => x.Email == email);
        }
    }
}