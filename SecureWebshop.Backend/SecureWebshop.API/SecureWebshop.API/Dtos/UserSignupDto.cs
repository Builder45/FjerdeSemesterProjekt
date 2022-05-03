using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.API.Dtos
{
    public class UserSignupDto
    {
        [Required]
        [StringLength(100, MinimumLength = 5)]
        public string Email { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 8)]
        public string Password { get; set; }
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        public int PhoneNumber { get; set; }
        [Required]
        public AddressDto Address { get; set; }
    }
}
