using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Users
{
    public class UpdateUserPasswordRequest
    {
        public string UserId { get; set; } = string.Empty;

        [StringLength(100, MinimumLength = 10)]
        public string Password { get; set; }
    }
}
