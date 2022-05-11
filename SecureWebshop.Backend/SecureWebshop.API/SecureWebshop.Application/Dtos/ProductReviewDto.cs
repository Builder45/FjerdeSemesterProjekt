using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Dtos
{
    public class ProductReviewDto
    {
        public string Text { get; set; }
        public int Rating { get; set; }
        public string Author { get; set; }

        public void Map(ProductReview productReview)
        {
            Text = productReview.Text;
            Rating = productReview.Rating;
            Author = productReview.Author;
        }
    }
}
