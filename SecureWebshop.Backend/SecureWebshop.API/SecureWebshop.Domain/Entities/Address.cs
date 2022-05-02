﻿namespace SecureWebshop.Domain.Entities
{
    public class Address
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; }
        public string Street { get; set; }
        public int PostalCode { get; set; }
    }
}
