using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.Data
{
    public class IdentityContext : IIdentityContext
    {
        public int? UserId { get; set; }
        public string? Email { get; set; }

        public void Login(User user)
        {
            UserId = user.Id;
            Email = user.Email;
        }

        public void Logout()
        {
            UserId = null;
            Email = null;
        }
    }
}