using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests.Orders;
using SecureWebshop.Application.Responses.Orders;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Services.Orders
{
    public class OrderService : IOrderService
    {
        private readonly IGenericRepo<Order> _genericOrderRepo;
        private readonly IGenericRepo<User> _genericUserRepo;
        private readonly IGenericRepo<Product> _genericProductRepo;

        public OrderService(IGenericRepo<Order> genericOrderRepo, IGenericRepo<User> genericUserRepo, IGenericRepo<Product> genericProductRepo)
        {
            _genericOrderRepo = genericOrderRepo;
            _genericUserRepo = genericUserRepo;
            _genericProductRepo = genericProductRepo;
        }

        public async Task<UpdateOrderResponse> ConfirmOrderAsync(string orderId, string userId)
        {
            var order = await _genericOrderRepo.Get(orderId);
            if (order == null)
                return new UpdateOrderResponse { Success = false, Error = "Order doesn't exist" };

            if (order.UserId != userId)
                return new UpdateOrderResponse { Success = false, Error = "Order doesn't belong to you" };

            order.IsCompleted = true;
            await _genericOrderRepo.CreateOrUpdate(order);

            return new UpdateOrderResponse { Success = true };
        }

        public async Task<CreateOrderResponse> CreateOrderAsync(CreateOrderRequest request)
        {
            var user = await _genericUserRepo.Get(request.UserId);
            if (user == null)
                return new CreateOrderResponse { Success = false, Error = "User doesn't exist" };

            var selectedAddress = user.Addresses.FirstOrDefault(address => address.Title == request.AddressTitle);
            if (selectedAddress == null)
                return new CreateOrderResponse { Success = false, Error = "Selected address doesn't exist" };

            var orderIsValid = await VerifyOrder(request);
            if (!orderIsValid)
                return new CreateOrderResponse { Success = false, Error = "New order contains outdated/wrong products" };

            var orderLines = new List<OrderLine>();
            foreach (var item in request.Items)
            {
                orderLines.Add(new OrderLine
                {
                    ProductId = item.Id,
                    Quantity = item.Quantity,
                    UnitPrice = item.Price
                });
            }

            var order = new Order
            {
                UserId = request.UserId,
                Recipient = user.FirstName + " " + user.LastName,
                Address = selectedAddress,
                Items = orderLines
            };

            await _genericOrderRepo.CreateOrUpdate(order);
            return new CreateOrderResponse { Success = true, OrderId = order.Id };
        }

        private async Task<bool> VerifyOrder(CreateOrderRequest request)
        {
            var idList = new List<string>();
            request.Items.ForEach(item => idList.Add(item.Id));
            var products = await _genericProductRepo.GetRange(idList);

            foreach (KeyValuePair<string, Product> product in products)
            {
                if (product.Value == null)
                    return false;

                if (product.Value.Status != "Aktiv")
                    return false;

                var requestItem = request.Items.FirstOrDefault(item => item.Id == product.Key);
                var actualPrice = product.Value.Price * (100 - product.Value.PriceReduction) / 100;

                if (requestItem == null || requestItem.Price != actualPrice)
                    return false;

                if (product.Value.Amount - product.Value.AmountFrozen < requestItem.Quantity)
                    return false;
            }

            return true;
        }
    }
}
