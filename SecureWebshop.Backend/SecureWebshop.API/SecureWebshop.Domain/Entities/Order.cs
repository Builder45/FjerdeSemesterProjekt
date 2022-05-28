namespace SecureWebshop.Domain.Entities
{
    public class Order
    {
        public string Id { get; set; } = string.Empty;
        public DateTime Date { get; set; } = DateTime.Now;
        public bool IsCompleted { get; set; } = false;
        public string UserId { get; set; }
        public string Recipient { get; set; }
        public Address Address { get; set; }
        public List<OrderLine> Items { get; set; } = new List<OrderLine>();
    }
}
