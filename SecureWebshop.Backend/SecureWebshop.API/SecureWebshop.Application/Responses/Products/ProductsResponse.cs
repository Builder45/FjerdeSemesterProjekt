using SecureWebshop.Application.Dtos;

namespace SecureWebshop.Application.Responses.Products
{
    public class ProductsResponse : BaseResponse
    {
        public List<ProductDto> Products { get; set; } = new List<ProductDto>();
    }
}
