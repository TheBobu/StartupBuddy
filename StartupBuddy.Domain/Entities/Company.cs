namespace StartupBuddy.Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public string Name { get; set; }
        public string Domain { get; set; }
        public string MainActivity { get; set; }
        public string Description { get; set; }
        public string ExperienceLevel { get; set; }
        public int NumberOfEmployees { get; set; }
        public string? CUI { get; set; }
        public DateTimeOffset? DateFounded { get; set; }
        public string? SocialDomain { get; set; }
        public string? ONRC { get; set; }
        public int? LogoFileId { get; set; }
        public File LogoFile { get; set; }
        public string Address { get; set; }
        public string BusinessEmail { get; set; }
        public string Phone { get; set; }
        public List<Member> Members { get; set; }
    }
}