using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Auth
{
    public class SignupRequest
    {
        [Required]
        [StringLength(100, MinimumLength = 3)]
        public string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 10)]
        public string Password { get; set; }
        [Required]
        [StringLength(50)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public string LastName { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
    }
}
