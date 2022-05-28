
namespace SecureWebshop.Domain.Entities
{
    public class OrderLine
    {
        public string ProductId { get; set; }
        public int Quantity { get; set; }
        public double UnitPrice { get; set; }
    }
}
