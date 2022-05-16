using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Dtos
{
    public class ProductReviewDto
    {
        public string Author { get; set; }
        public string Title { get; set; }
        public string Text { get; set; }
        public int Rating { get; set; }
        public DateTime Date { get; set; }
        

        public void Map(ProductReview productReview)
        {
            Text = productReview.Text;
            Rating = productReview.Rating;
            Author = productReview.Author;
            Title = productReview.Title;
            Date = productReview.Date;
        }
    }
}
