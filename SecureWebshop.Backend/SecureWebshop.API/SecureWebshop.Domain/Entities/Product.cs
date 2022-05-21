namespace SecureWebshop.Domain.Entities
{
    public class Product
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double PriceReduction { get; set; } = 0;
        public double Rating { get; set; } = 0;
        public int TotalReviews { get; set; } = 0;
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public string Status { get; set; } = "Hidden"; // Hidden || Active || Inactive || Future 
        public List<ProductReview> Reviews { get; set; } = new List<ProductReview>();

        public void AddReview(ProductReview newReview)
        {
            var existingReview = Reviews.FirstOrDefault(review => review.UserId == newReview.UserId);

            if (existingReview != null)
            {
                Reviews.Remove(existingReview);
            }

            Reviews.Add(newReview);
            UpdateReviewInformation();
        }

        private void UpdateReviewInformation()
        {
            TotalReviews = Reviews.Count;

            double totalRating = 0;
            Reviews.ForEach(review => totalRating += review.Rating);

            Rating = totalRating / TotalReviews;
        }
    }
}
