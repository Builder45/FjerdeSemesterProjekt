using SecureWebshop.Application.Dtos;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests;
using SecureWebshop.Application.Requests.Products;
using SecureWebshop.Application.Responses.Products;
using SecureWebshop.Domain.Entities;
using System.Globalization;

namespace SecureWebshop.Application.Services.Products
{
    public class ProductService : IProductService
    {
        private readonly IGenericRepo<Product> _genericProductRepo;

        public ProductService(IGenericRepo<Product> genericProductRepo)
        {
            _genericProductRepo = genericProductRepo;
        }

        public async Task<UpdateProductResponse> CreateProductAsync(UpdateProductRequest updateProductRequest)
        {
            var newProduct = new Product
            {
                Name = updateProductRequest.Name,
                Description = updateProductRequest.Description,
                Price = updateProductRequest.Price,
                Rating = updateProductRequest.Rating,
                TotalReviews = updateProductRequest.TotalReviews,
                ImageUrl = updateProductRequest.ImageUrl,
                ThumbnailUrl = updateProductRequest.ThumbnailUrl,
                IsActive = true
            };

            await _genericProductRepo.CreateOrUpdate(newProduct);

            return new UpdateProductResponse { Success = true };
        }

        public async Task<ProductsResponse> GetProductsAsync(QueryRequest queryRequest)
        {
            IEnumerable<Product> products;

            if (String.IsNullOrWhiteSpace(queryRequest.Search))
            {
                products = await _genericProductRepo.GetAll(queryRequest.PageSize, queryRequest.PageNumber);
            }
            else
            {
                products = await _genericProductRepo.GetAllByCondition(queryRequest.PageSize, queryRequest.PageNumber, 
                    product => product.Name.Contains(queryRequest.Search, StringComparison.CurrentCultureIgnoreCase)
                );
            }
            
            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                var productDto = new ProductDto();
                productDto.Map(product);
                productDtos.Add(productDto);
            }

            return new ProductsResponse
            {
                Success = true,
                Products = productDtos
            };
        }

        public async Task<ProductResponse> GetProductAsync(string productId)
        {
            var product = await _genericProductRepo.Get(productId);

            if (product == null)
            {
                return new ProductResponse { Success = false, Error = "Invalid product ID" };
            }

            var productDto = new ProductDto();
            productDto.Map(product);

            return new ProductResponse
            {
                Success = true,
                Product = productDto
            };
        }

        public async Task<UpdateProductResponse> UpdateProductAsync(UpdateProductRequest updateProductRequest)
        {
            var newProduct = new Product
            {
                Id = updateProductRequest.Id,
                Name = updateProductRequest.Name,
                Description = updateProductRequest.Description,
                Price = updateProductRequest.Price,
                Rating = updateProductRequest.Rating,
                TotalReviews = updateProductRequest.TotalReviews,
                ImageUrl = updateProductRequest.ImageUrl,
                ThumbnailUrl = updateProductRequest.ThumbnailUrl,
                IsActive = true
            };

            await _genericProductRepo.CreateOrUpdate(newProduct);

            return new UpdateProductResponse { Success = true };
        }

        public async Task<UpdateProductResponse> DeleteProductAsync(string productId)
        {
            await _genericProductRepo.Delete(productId);

            return new UpdateProductResponse { Success = true };
        }

        public async Task<UpdateProductResponse> DeactivateProductAsync(string productId)
        {
            // await _productRepo.Deactivate(productId);

            return new UpdateProductResponse { Success = true };
        }

        public async Task<UpdateProductResponse> UpdateProductReviewsAsync(UpdateProductReviewsRequest request)
        {
            if (request.UserId == null)
            {
                return new UpdateProductResponse { Success = false, Error = "Authorized User Id required" };
            }

            var product = await _genericProductRepo.Get(request.ProductId);

            if (product == null)
            {
                return new UpdateProductResponse { Success = false, Error = "Invalid product ID" };
            }

            var existingReview = product.Reviews.FirstOrDefault(review => review.UserId == request.UserId);

            if (existingReview != null)
            {
                existingReview.Author = request.Author;
                existingReview.Title = request.Title;
                existingReview.Text = request.Text;
                existingReview.Rating = request.Rating;
                existingReview.Date = DateTime.Now;

                product.UpdateReviewInformation();

                await _genericProductRepo.CreateOrUpdate(product);
                return new UpdateProductResponse { Success = true };
            }

            var newReview = new ProductReview
            {
                UserId = request.UserId,
                Author = request.Author,
                Title = request.Title,
                Text = request.Text,
                Rating = request.Rating,
                Date = DateTime.Now,
            };

            product.Reviews.Add(newReview);

            product.UpdateReviewInformation();

            await _genericProductRepo.CreateOrUpdate(product);
            return new UpdateProductResponse { Success = true };
        }
    }
}
