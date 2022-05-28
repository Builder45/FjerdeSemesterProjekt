using Konscious.Security.Cryptography;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using System.Security.Cryptography;
using System.Text;

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

        public static string HashUsingArgon(string text, byte[] salt)
        {
            var argon2 = new Argon2i(Encoding.ASCII.GetBytes(text));
            argon2.DegreeOfParallelism = 16;
            argon2.MemorySize = 8192;
            argon2.Iterations = 40;
            argon2.Salt = salt;

            var hash = argon2.GetBytes(128);

            return Convert.ToBase64String(hash);
        }
    }
}
