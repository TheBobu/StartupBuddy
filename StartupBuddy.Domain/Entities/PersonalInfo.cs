namespace StartupBuddy.Domain.Entities
{
    public class PersonalInfo
    {
        public string Address { get; set; }
        public int Age { get; set; }
        public string CNP { get; set; }
        public string Education { get; set; }
        public int ExperienceLevel { get; set; }
        public string FirstName { get; set; }
        public int Id { get; set; }
        public string LastName { get; set; }
        public string Number { get; set; }
        public string Series { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}