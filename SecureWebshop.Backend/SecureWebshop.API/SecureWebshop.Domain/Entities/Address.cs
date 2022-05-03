namespace SecureWebshop.Domain.Entities
{
    public class Address
    {
        public string Title { get; set; }
        public string Street { get; set; }
        public int PostalCode { get; set; }

        public Address(string title, string street, int postalCode)
        {
            Title = title;
            Street = street;
            PostalCode = postalCode;
        }
    }
}
