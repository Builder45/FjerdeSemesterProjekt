namespace SecureWebshop.Domain.Entities
{
    public class Product
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double AverageRating { get; set; }
        public List<ProductReview> Reviews { get; set; }
    }
}
