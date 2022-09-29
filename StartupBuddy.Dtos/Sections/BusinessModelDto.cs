using StartupBuddy.Dtos.File;

namespace StartupBuddy.Dtos.Sections
{
    public class BusinessModelDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string? Type { get; set; }
        public int? DiagramFileId { get; set; }
        public FileDto DiagramFile { get; set; }
        public string? Problem { get; set; }
        public string? Solution { get; set; }
        public string? Clients { get; set; }
        public string? RevenueStreams { get; set; }
    }
}