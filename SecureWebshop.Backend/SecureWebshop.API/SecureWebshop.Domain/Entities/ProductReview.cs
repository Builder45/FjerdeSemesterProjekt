namespace SecureWebshop.Domain.Entities
{
    public class ProductReview
    {
        public string Author { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        public string UserId { get; set; }
    }
}
