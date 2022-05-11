using SecureWebshop.Application.Dtos;

namespace SecureWebshop.Application.Responses.Products
{
    public class ProductResponse : BaseResponse
    {
        public ProductDto Product { get; set; }
    }
}
