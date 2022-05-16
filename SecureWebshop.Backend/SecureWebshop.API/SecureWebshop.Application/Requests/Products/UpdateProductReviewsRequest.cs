using SecureWebshop.Application.Dtos;

namespace SecureWebshop.Application.Requests.Products
{
    public class UpdateProductReviewsRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string ProductId { get; set; } = string.Empty;
        public string Author { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
    }
}
