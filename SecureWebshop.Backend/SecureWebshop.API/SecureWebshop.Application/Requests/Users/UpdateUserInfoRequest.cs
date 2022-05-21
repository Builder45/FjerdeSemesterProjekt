using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests.Users
{
    public class UpdateUserInfoRequest
    {
        public string UserId { get; set; } = string.Empty;

        [StringLength(50)]
        public string FirstName { get; set; }

        [StringLength(100)]
        public string LastName { get; set; }
        public int PhoneNumber { get; set; }
    }
}
