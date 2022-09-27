using StartupBuddy.Domain.Entities;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IUserRepository : IBaseRepository<User, int>
    {
        User GetUserByEmail(string email);
    }
}