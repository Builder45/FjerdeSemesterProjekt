namespace SecureWebshop.Application.Requests.UserRequests
{
    public class CreateUserRequest
    {
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Name { get; set; }
        public int PhoneNumber { get; set; }
        public string AddressTitle { get; set; }
        public string AddressStreet { get; set; }
        public int AddressPostalCode { get; set; }
    }
}
