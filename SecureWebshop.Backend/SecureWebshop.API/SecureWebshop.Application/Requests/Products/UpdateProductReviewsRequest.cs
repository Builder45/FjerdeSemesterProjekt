using SecureWebshop.Application.Dtos;
using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Products
{
    public class UpdateProductReviewsRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string ProductId { get; set; } = string.Empty;

        [StringLength(20)]
        public string Author { get; set; }

        [StringLength(30)]
        public string Title { get; set; }

        [StringLength(200)]
        public string Text { get; set; }

        [Range(0,5)]
        public int Rating { get; set; }
    }
}
