namespace StartupBuddy.Dtos.User
{
    public class PersonalInfoDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string CNP { get; set; }
        public string Series { get; set; }
        public string Number { get; set; }
        public string Education { get; set; }
        public string ExperienceLevel { get; set; }
    }
}