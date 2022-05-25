using SecureWebshop.Application.Dtos;

namespace SecureWebshop.Application.Requests.Users
{
    public class CreateUserAddressRequest : AddressDto
    {
        public string UserId { get; set; } = string.Empty;
    }
}
