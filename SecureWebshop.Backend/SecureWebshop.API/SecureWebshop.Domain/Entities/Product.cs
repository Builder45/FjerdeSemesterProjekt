namespace SecureWebshop.Domain.Entities
{
    public class Product
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; }
        public int TotalReviews { get; set; }
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public bool IsActive { get; set; }
        public List<ProductReview> Reviews { get; set; } = new List<ProductReview>();
    }
}
