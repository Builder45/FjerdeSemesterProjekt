using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Dtos
{
    public class ProductDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public double Rating { get; set; } = 0;
        public int TotalReviews { get; set; } = 0;
        public string ImageUrl { get; set; }
        public string ThumbnailUrl { get; set; }
        public List<ProductReviewDto> Reviews { get; set; } = new List<ProductReviewDto>();

        public void Map(Product product)
        {
            Id = product.Id;
            Name = product.Name;
            Description = product.Description;
            Price = product.Price;
            Rating = product.Rating;
            TotalReviews = product.TotalReviews;
            ImageUrl = product.ImageUrl;
            ThumbnailUrl = product.ThumbnailUrl;

            if (product.Reviews == null)
            {
                Reviews = null;
                return;
            }

            foreach (var review in product.Reviews)
            {
                var reviewDto = new ProductReviewDto();
                reviewDto.Map(review);
                Reviews.Add(reviewDto);
            }
        }
    }
}
