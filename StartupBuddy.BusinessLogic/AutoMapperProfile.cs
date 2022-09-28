using AutoMapper;
using StartupBuddy.Domain.Entities;
using StartupBuddy.Dtos.User;

namespace StartupBuddy.BusinessLogic
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDto>();
            CreateMap<UserDto, User>();
            CreateMap<User, AccountDto>();
            CreateMap<AccountDto, User>();
            
            CreateMap<Company, CompanyDto>();
            CreateMap<CompanyDto, Company>();
        }
    }
}