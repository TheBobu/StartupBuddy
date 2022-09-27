namespace StartupBuddy.Domain.Entities
{
    public class BusinessModel
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string? Type { get; set; }
        public int? DiagramFileId { get; set; }
        public File DiagramFile { get; set; }
        public string? Problem { get; set; }
        public string? Solution { get; set; }
        public string? Clients { get; set; }
        public string? RevenueStreams { get; set; }
    }
}