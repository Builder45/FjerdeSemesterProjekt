namespace SecureWebshop.Domain.Entities
{
    public class User
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Name { get; set; }
        public int PhoneNumber { get; set; }
        public List<Address> Addresses { get; set; } = new List<Address>();
    }
}
