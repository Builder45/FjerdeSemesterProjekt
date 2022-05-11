using SecureWebshop.Application.Dtos;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests;
using SecureWebshop.Application.Requests.Products;
using SecureWebshop.Application.Responses.Products;
using SecureWebshop.Domain.Entities;

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
            var products = await _genericProductRepo.GetAll(queryRequest.PageSize, queryRequest.PageNumber);
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
    }
}
