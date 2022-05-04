namespace SecureWebshop.Domain.Entities
{
    public class RefreshToken
    {
        public string TokenHash { get; set; }
        public string TokenSalt { get; set; }
        public DateTime ExpiryDate { get; set; }
        public DateTime CreationDate { get; set; }
    }
}
