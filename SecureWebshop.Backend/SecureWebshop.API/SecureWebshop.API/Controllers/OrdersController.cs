using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Requests;
using SecureWebshop.Application.Requests.Orders;
using SecureWebshop.Application.Services.Orders;

namespace SecureWebshop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : BaseApiController
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // POST => URL/api/Orders
        [Authorize]
        [HttpPost()]
        public async Task<IActionResult> CreateOrder(CreateOrderRequest request)
        {
            request.UserId = UserId;
            var response = await _orderService.CreateOrderAsync(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        // PUT => URL/api/Orders/{orderId}
        [Authorize]
        [HttpPut("{orderId}")]
        public async Task<IActionResult> ConfirmOrder([FromRoute] string orderId)
        {
            var response = await _orderService.ConfirmOrderAsync(orderId, UserId);

            return response.Success ? Ok(response) : BadRequest(response);
        }

    }
}
