namespace StartupBuddy.Domain.Entities
{
    public class File
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Content { get; set; }
        public long Size { get; set; }
        public string ContentType { get; set; }
    }
}