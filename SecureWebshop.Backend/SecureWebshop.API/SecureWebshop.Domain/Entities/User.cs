namespace SecureWebshop.Domain.Entities
{
    public class User
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PasswordSalt { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int PhoneNumber { get; set; }
        public DateTime CreationDate { get; set; }
        public bool IsActive { get; set; }
        public List<Address> Addresses { get; set; } = new List<Address>();
        public RefreshToken? RefreshToken { get; set; }
    }
}
