using SecureWebshop.Application.Dtos;

namespace SecureWebshop.Application.Requests.Orders
{
    public class CreateOrderRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string AddressTitle { get; set; }
        public List<OrderLineDto> Items { get; set; } = new List<OrderLineDto>();
    }
}
