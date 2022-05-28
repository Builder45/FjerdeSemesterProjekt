using SecureWebshop.Application.Requests.Orders;
using SecureWebshop.Application.Responses.Orders;

namespace SecureWebshop.Application.Services.Orders
{
    public interface IOrderService
    {
        Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request);
        Task<UpdateOrderResponse> ConfirmOrderAsync(string orderId, string userId);
    }
}