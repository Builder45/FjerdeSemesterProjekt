namespace SecureWebshop.API.Dtos
{
    public class UserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Email { get; set; }
        public string Name { get; set; }
        public int PhoneNumber { get; set; }
        public List<AddressDto> Addresses { get; set; } = new List<AddressDto>();
    }
}
