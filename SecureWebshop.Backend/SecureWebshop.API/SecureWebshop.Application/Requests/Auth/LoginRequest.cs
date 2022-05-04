using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Auth
{
    public class LoginRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }
    }
}
