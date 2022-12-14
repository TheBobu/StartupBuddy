using Microsoft.AspNetCore.Http;
using StartupBuddy.Dtos.File;
using StartupBuddy.Dtos.Sections;

namespace StartupBuddy.Dtos.User
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public int Domain { get; set; }
        public string MainActivity { get; set; }
        public string Description { get; set; }
        public string ExperienceLevel { get; set; }
        public int NumberOfEmployees { get; set; }
        public string? CUI { get; set; }
        public DateTimeOffset? DateFounded { get; set; }
        public string? SocialDomain { get; set; }
        public string? ONRC { get; set; }
        public int? LogoFileId { get; set; }
        public IFormFile LogoFormFile { get; set; }
        public FileDto LogoFile { get; set; }
        public string Address { get; set; }
        public string BusinessEmail { get; set; }
        public string Phone { get; set; }
        public List<MemberDto> Members { get; set; }
        public bool Employees { get; set; }
        public bool Accountant { get; set; }
        public bool StockMarket { get; set; }
        public string SecondaryActivities { get; set; }
    }
}