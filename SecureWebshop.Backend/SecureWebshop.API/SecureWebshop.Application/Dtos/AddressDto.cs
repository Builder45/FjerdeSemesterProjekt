using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Dtos
{
    public class AddressDto
    {
        [StringLength(30)]
        public string Title { get; set; }

        [StringLength(100)]
        public string Street { get; set; }

        [Range(1,9999)]
        public int PostalCode { get; set; }
    }
}
