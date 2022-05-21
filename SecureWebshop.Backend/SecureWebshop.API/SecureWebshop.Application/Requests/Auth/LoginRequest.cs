using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Auth
{
    public class LoginRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Email { get; set; }

        [Required]
        [StringLength(100, MinimumLength = 10)]
        public string Password { get; set; }
    }
}
