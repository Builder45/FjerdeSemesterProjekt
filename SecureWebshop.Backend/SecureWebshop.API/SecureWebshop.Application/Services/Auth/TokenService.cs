using SecureWebshop.Application.Helpers;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly List<string> Admins;
        private readonly ITokenHelper _tokenHelper;
        private readonly IGenericRepo<User> _genericUserRepo;
        public TokenService(ITokenHelper tokenHelper, IGenericRepo<User> genericUserRepo)
        {
            _tokenHelper = tokenHelper;
            _genericUserRepo = genericUserRepo;
            Admins = new List<string> { "56653127-f92d-43f5-a1eb-69ba8445956e" };
        }

        public async Task<Tuple<string, string>> GenerateTokensAsync(string userId)
        {
            var user = await _genericUserRepo.Get(userId);
            if (user == null)
                return null;

            // Midlertidig rollefordeling:
            bool isAdmin = Admins.Contains(userId);

            var accessToken = await _tokenHelper.GenerateAccessToken(userId, isAdmin);
            var refreshToken = await _tokenHelper.GenerateRefreshToken();

            var salt = HashHelper.GenerateSecureSalt();
            var refreshTokenHashed = HashHelper.HashUsingPbkdf2(refreshToken, salt);

            var newRefreshToken = new RefreshToken
            {
                ExpiryDate = DateTime.Now.AddMinutes(60),
                CreationDate = DateTime.Now,
                TokenHash = refreshTokenHashed,
                TokenSalt = Convert.ToBase64String(salt)
            };
            user.RefreshToken = newRefreshToken;

            await _genericUserRepo.CreateOrUpdate(user);

            return new Tuple<string, string>(accessToken, refreshToken);
        }

        public async Task<bool> RemoveRefreshTokenAsync(string userId)
        {
            var user = await _genericUserRepo.Get(userId);

            if (user == null)
                return false;

            if (user.RefreshToken == null)
                return false;

            user.RefreshToken = null;
            await _genericUserRepo.CreateOrUpdate(user);
            return true;
        }

        public async Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(RefreshTokenRequest refreshTokenRequest)
        {
            var response = new ValidateRefreshTokenResponse() { Success = false };

            var user = await _genericUserRepo.Get(refreshTokenRequest.UserId);
            if (user == null)
            {
                response.Error = "Invalid Id - No such user exists";
                return response;
            }

            if (user.RefreshToken == null)
            {
                response.Error = "Invalid session or user is already logged out";
                return response;
            }

            var requestTokenHash = HashHelper.HashUsingPbkdf2(refreshTokenRequest.RefreshToken, Convert.FromBase64String(user.RefreshToken.TokenSalt));
            if (user.RefreshToken.TokenHash != requestTokenHash)
            {
                response.Error = "Invalid refresh token!";
                return response;
            }

            if (user.RefreshToken.ExpiryDate < DateTime.Now)
            {
                response.Error = "Refresh token has expired!";
                return response;
            }

            response.Success = true;
            response.UserId = refreshTokenRequest.UserId;
            return response;
        }
    }
}
