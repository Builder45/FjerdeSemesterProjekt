namespace SecureWebshop.Application.Requests.Users
{
    public class DeleteUserAddressRequest
    {
        public string UserId { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
    }
}
