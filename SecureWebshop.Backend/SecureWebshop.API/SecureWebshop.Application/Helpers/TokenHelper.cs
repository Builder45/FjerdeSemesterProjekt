using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace SecureWebshop.Application.Helpers
{
    public class TokenHelper : ITokenHelper
    {
        private readonly IConfiguration _config;

        public TokenHelper(IConfiguration config)
        {
            _config = config;
        }

        public async Task<string> GenerateAccessToken(string userId, bool userIsAdmin)
        {
            var tokenHandler = new JwtSecurityTokenHandler();

            // Den hemmelige nøgle omdannes til en Symmetric Security Key:
            var byteKey = Convert.FromBase64String(_config.GetSection("JWT:Key").Value);
            var key = new SymmetricSecurityKey(byteKey);

            // Der oprettes credentials med nøglen ud fra Sha384 algoritmen:
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha384Signature);

            // Opsætning af ClaimsIdentity med claims:
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, userId)
            };

            if (userIsAdmin)
            {
                claims.Add(new Claim(ClaimTypes.Role, "Admin"));
            }
            else
            {
                claims.Add(new Claim(ClaimTypes.Role, "User"));
            }

            var claimsIdentity = new ClaimsIdentity(claims);

            // Opsætning af indholdet i vores JWT Token:
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claimsIdentity,
                Issuer = _config.GetSection("JWT:Issuer").Value,
                Audience = _config.GetSection("JWT:Audience").Value,
                Expires = DateTime.Now.AddMinutes(30),
                SigningCredentials = credentials
            };

            var securityToken = tokenHandler.CreateToken(tokenDescriptor);
            return await Task.Run(() => tokenHandler.WriteToken(securityToken));
        }

        public async Task<string> GenerateRefreshToken()
        {
            var secureRandomBytes = new byte[32];

            using var randomNumberGenerator = RandomNumberGenerator.Create();
            await Task.Run(() => randomNumberGenerator.GetBytes(secureRandomBytes));

            var refreshToken = Convert.ToBase64String(secureRandomBytes);
            return refreshToken;
        }
    }
}
