namespace SecureWebshop.Application.Dtos
{
    public class OrderDto
    {
        public string Id { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; } = false;
        public string UserId { get; set; } = string.Empty;
        public string Recipient { get; set; }
        public AddressDto Address { get; set; }
        public List<OrderLineDto> Items { get; set; } = new List<OrderLineDto>();
    }
}
