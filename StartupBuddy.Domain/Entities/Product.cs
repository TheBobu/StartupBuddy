namespace StartupBuddy.Domain.Entities
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string ProductType { get; set; }
        public string Description { get; set; }
    }
}