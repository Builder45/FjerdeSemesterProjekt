namespace SecureWebshop.Domain.Entities
{
    public class Order
    {
        public string Id { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public bool IsCompleted { get; set; } = false;
        public Address Address { get; set; }
        public List<Product> Products { get; set; }
    }
}
