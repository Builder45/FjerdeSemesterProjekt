using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;

namespace SecureWebshop.Application.Helpers
{
    public class HashHelper
    {
        public static byte[] GenerateSecureSalt() => RandomNumberGenerator.GetBytes(32);

        public static string HashUsingPbkdf2(string text, byte[] salt)
        {
            byte[] derivedKey = KeyDerivation.Pbkdf2(text, salt, KeyDerivationPrf.HMACSHA256, iterationCount: 100000, 32);
            return Convert.ToBase64String(derivedKey);
        }
    }
}
