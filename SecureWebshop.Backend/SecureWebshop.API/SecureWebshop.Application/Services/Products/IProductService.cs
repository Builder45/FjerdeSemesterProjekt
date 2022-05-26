using SecureWebshop.Application.Requests;
using SecureWebshop.Application.Requests.Products;
using SecureWebshop.Application.Responses.Products;

namespace SecureWebshop.Application.Services.Products
{
    public interface IProductService
    {
        Task<ProductsResponse> GetProductsAsync(QueryRequest queryRequest, bool includeAll = false);
        Task<ProductResponse> GetProductAsync(string productId);
        Task<UpdateProductResponse> CreateProductAsync(UpdateProductRequest updateProductRequest);
        Task<UpdateProductResponse> UpdateProductAsync(UpdateProductRequest updateProductRequest);
        Task<UpdateProductResponse> DeleteProductAsync(string productId);
        Task<UpdateProductResponse> DeactivateProductAsync(string productId);
        Task<UpdateProductResponse> UpdateProductReviewsAsync(UpdateProductReviewsRequest request);
    }
}
