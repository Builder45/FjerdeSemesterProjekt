using SecureWebshop.Application.Helpers;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Services.Auth
{
    public class TokenService : ITokenService
    {
        private readonly ITokenHelper _tokenHelper;
        private readonly IGenericRepo<User> _genericUserRepo;
        public TokenService(ITokenHelper tokenHelper, IGenericRepo<User> genericUserRepo)
        {
            _tokenHelper = tokenHelper;
            _genericUserRepo = genericUserRepo;
        }

        public async Task<Tuple<string, string>> GenerateTokensAsync(string userId)
        {
            var accessToken = await _tokenHelper.GenerateAccessToken(userId);
            var refreshToken = await _tokenHelper.GenerateRefreshToken();

            var user = await _genericUserRepo.Get(userId);

            if (user == null)
                return null;

            var salt = HashHelper.GenerateSecureSalt();
            var refreshTokenHashed = HashHelper.HashUsingPbkdf2(refreshToken, salt);

            if (user.RefreshTokens != null && user.RefreshTokens.Any())
            {
                await RemoveRefreshTokenAsync(user.Id);
            }

            user.RefreshTokens?.Add(new RefreshToken
            {
                ExpiryDate = DateTime.Now.AddMinutes(10),
                CreationDate = DateTime.Now,
                TokenHash = refreshTokenHashed,
                TokenSalt = Convert.ToBase64String(salt)
            });

            await _genericUserRepo.CreateOrUpdate(user);

            return new Tuple<string, string>(accessToken, refreshToken);
        }

        public async Task<bool> RemoveRefreshTokenAsync(string userId)
        {
            var user = await _genericUserRepo.Get(userId);

            if (user == null)
                return false;

            if (user.RefreshTokens != null && user.RefreshTokens.Any())
            {
                // Fjern første token på listen
                user.RefreshTokens.RemoveAt(0);
                await _genericUserRepo.CreateOrUpdate(user);
            }

            return true;
        }

        public async Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(RefreshTokenRequest refreshTokenRequest)
        {
            var response = new ValidateRefreshTokenResponse() { Success = false };

            var user = await _genericUserRepo.Get(refreshTokenRequest.UserId);
            if (user == null)
            {
                response.Error = "Invalid Id - No such user exists";
                response.ErrorCode = "R02";
                return response;
            }

            var refreshToken = user.RefreshTokens.FirstOrDefault();
            if (refreshToken == null)
            {
                response.Error = "Invalid session or user is already logged out";
                response.ErrorCode = "R02";
                return response;
            }

            var requestTokenHashed = HashHelper.HashUsingPbkdf2(refreshTokenRequest.RefreshToken, Convert.FromBase64String(refreshToken.TokenSalt));
            if (refreshToken.TokenHash != requestTokenHashed)
            {
                response.Error = "Invalid refresh token!";
                response.ErrorCode = "R03";
                return response;
            }

            if (refreshToken.ExpiryDate < DateTime.Now)
            {
                response.Error = "Refresh token has expired!";
                response.ErrorCode = "R04";
                return response;
            }

            response.Success = true;
            response.UserId = refreshTokenRequest.UserId;
            return response;
        }
    }
}
