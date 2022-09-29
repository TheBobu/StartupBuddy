namespace StartupBuddy.Dtos.Sections
{
    public class MarketResearchDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public string? Demand { get; set; }
        public string? Interest { get; set; }
        public string? BusinessArea { get; set; }
        public string? Competitors { get; set; }
        public string? Revenue { get; set; }
        public string? Differentiation { get; set; }
    }
}