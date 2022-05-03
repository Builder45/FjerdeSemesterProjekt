using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.API.Dtos
{
    public class AddressDto
    {
        [StringLength(30)]
        public string Title { get; set; }
        [StringLength(50)]
        public string Street { get; set; }
        [Range(1000, 9990)]
        public int PostalCode { get; set; }
    }
}
