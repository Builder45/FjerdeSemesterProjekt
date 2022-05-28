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

        public async Task<UpdateProductResponse> CreateProductAsync(UpdateProductRequest request)
        {
            var newProduct = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Price = request.Price,
                ImageUrl = request.ImageUrl
            };

            await _genericProductRepo.CreateOrUpdate(newProduct);
            return new UpdateProductResponse { Success = true };
        }

        public async Task<string> CreateDummyProductAsync()
        {
            var newProduct = new Product
            {
                Name = "Navn på produkt",
                Description = "Dette er en midlertidig produktbeskrivelse",
                Price = 0,
                ImageUrl = "https://face-2-face.dk/wp-content/uploads/2022/01/placeholder-3.png"
            };

            await _genericProductRepo.CreateOrUpdate(newProduct);
            return newProduct.Id;
        }

        public async Task<ProductsResponse> GetProductsAsync(QueryRequest request, bool includeAll = false)
        {
            IEnumerable<Product> products;

            if (includeAll)
            {
                products = await _genericProductRepo.GetAll(request.PageSize, request.PageNumber);
            }
            else
            {
                if (String.IsNullOrWhiteSpace(request.Search))
                {
                    products = await _genericProductRepo.GetAllByCondition(request.PageSize, request.PageNumber, product =>
                        product.Status == "Aktiv"
                    );
                }
                else
                {
                    products = await _genericProductRepo.GetAllByCondition(request.PageSize, request.PageNumber, product =>
                        product.Status == "Aktiv" &&
                        product.Name.Contains(request.Search, StringComparison.CurrentCultureIgnoreCase)
                    );
                }
            }
            
            var productDtos = new List<ProductDto>();

            foreach (var product in products)
            {
                var productDto = new ProductDto();
                productDto.Map(product);
                productDtos.Add(productDto);
            }

            return new ProductsResponse { Success = true, Products = productDtos };
        }

        public async Task<ProductResponse> GetProductAsync(string productId)
        {
            var product = await _genericProductRepo.Get(productId);

            if (product == null)
                return new ProductResponse { Success = false, Error = "Invalid product ID" };

            var productDto = new ProductDto();
            productDto.Map(product);

            return new ProductResponse { Success = true, Product = productDto };
        }

        public async Task<UpdateProductResponse> UpdateProductAsync(UpdateProductRequest request)
        {
            var product = await _genericProductRepo.Get(request.Id);

            if (product == null)
                return new UpdateProductResponse { Success = false, Error = "Invalid product ID" };

            product.Id = request.Id;
            product.Name = request.Name;
            product.Description = request.Description;
            product.Price = request.Price;
            product.PriceReduction = request.PriceReduction;
            product.ImageUrl = request.ImageUrl;

            await _genericProductRepo.CreateOrUpdate(product);
            return new UpdateProductResponse { Success = true };
        }

        public async Task<UpdateProductResponse> DeleteProductAsync(string productId)
        {
            await _genericProductRepo.Delete(productId);
            return new UpdateProductResponse { Success = true };
        }

        public async Task<UpdateProductResponse> ToggleProductAsync(string productId)
        {
            var product = await _genericProductRepo.Get(productId);

            if (product == null)
                return new UpdateProductResponse { Success = false, Error = "Invalid product ID" };

            product.Status = product.Status == "Aktiv" ? "Inaktiv" : "Aktiv";

            await _genericProductRepo.CreateOrUpdate(product);
            return new UpdateProductResponse { Success = true };
        }

        public async Task<UpdateProductResponse> UpdateProductReviewsAsync(UpdateProductReviewsRequest request)
        {
            if (request.UserId == null)
                return new UpdateProductResponse { Success = false, Error = "Authorized User Id required" };

            var product = await _genericProductRepo.Get(request.ProductId);

            if (product == null)
                return new UpdateProductResponse { Success = false, Error = "Invalid product ID" };

            var newReview = new ProductReview
            {
                Author = request.Author,
                Title = request.Title,
                Text = request.Text,
                Rating = request.Rating,
                Date = DateTime.Now,
                UserId = request.UserId
            };

            product.AddReview(newReview);

            await _genericProductRepo.CreateOrUpdate(product);
            return new UpdateProductResponse { Success = true };
        }
    }
}
