using StartupBuddy.Dtos.User;

namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IUserBusinessLogic
    {
        AccountDto AuthenticateUser(LoginDto login);

        bool Register(UserDto userDto);
    }
}