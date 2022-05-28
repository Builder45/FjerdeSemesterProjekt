namespace SecureWebshop.Application.Dtos
{
    public class OrderLineDto
    {
        public string Id { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public double Price { get; set; }
    }
}
