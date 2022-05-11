namespace SecureWebshop.Domain.Entities
{
    public class ProductReview
    {
        public string Text { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }
        public string UserId { get; set; }
    }
}
