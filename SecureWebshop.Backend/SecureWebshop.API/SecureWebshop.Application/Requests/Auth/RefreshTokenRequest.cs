using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Auth
{
    public class RefreshTokenRequest
    {
        [Required]
        public string UserId { get; set; }
        [Required]
        public string RefreshToken { get; set; }
    }
}
