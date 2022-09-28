using AutoMapper;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using StartupBuddy.BusinessLogic.Interfaces;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Domain.Interfaces;
using StartupBuddy.Dtos.User;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace StartupBuddy.BusinessLogic.Implementations
{
    public class UserBusinessLogic : BaseBusinessLogic, IUserBusinessLogic
    {
        private IConfiguration config;

        public UserBusinessLogic(IUnitOfWork unitOfWork, IMapper mapper, IConfiguration config, IIdentityContext identityContext) : base(identityContext, unitOfWork, mapper)
        {
            this.config = config;
        }

        public AccountDto AuthenticateUser(LoginDto login)
        {
            var user = unitOfWork.UserRepository.GetUserByEmail(login.Email);

            if (user == null)
            {
                return null;
            }

            if (user != null)
            {
                if (Sha256_hash(login.Password).Equals(user.Password))
                {
                    identityContext.Login(user);
                    var account = mapper.Map<AccountDto>(user);
                    account.AuthorizationToken = GenerateJSONWebToken(mapper.Map<UserDto>(user));
                    return account;
                }
            }

            return null;
        }

        public bool Register(UserDto userDto)
        {
            try
            {
                userDto.Password = Sha256_hash(userDto.Password);
                unitOfWork.UserRepository.Add(mapper.Map<User>(userDto));
                unitOfWork.Save();
                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        private string GenerateJSONWebToken(UserDto user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>();
            claims.Add(new Claim("email", user.Email));

            var token = new JwtSecurityToken(config["Jwt:Issuer"],
              config["Jwt:Issuer"],
              claims,
              expires: DateTime.Now.AddMinutes(120),
              signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public static string Sha256_hash(string value)
        {
            StringBuilder Sb = new StringBuilder();

            using (var hash = SHA256.Create())
            {
                Encoding enc = Encoding.UTF8;
                byte[] result = hash.ComputeHash(enc.GetBytes(value));

                foreach (byte b in result)
                    Sb.Append(b.ToString("x2"));
            }

            return Sb.ToString();
        }

        public void Logout()
        {
            identityContext.Logout();
        }
    }
}