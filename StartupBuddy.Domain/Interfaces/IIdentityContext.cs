using StartupBuddy.Domain.Entities;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IIdentityContext
    {
        public int? UserId { get; set; }
        public string? Email { get; set; }

        void Login(User user);

        void Logout();
    }
}