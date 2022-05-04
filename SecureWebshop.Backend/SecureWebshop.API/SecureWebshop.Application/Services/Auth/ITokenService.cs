using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Services.Auth
{
    public interface ITokenService
    {
        Task<Tuple<string, string>> GenerateTokensAsync(string userId);
        Task<ValidateRefreshTokenResponse> ValidateRefreshTokenAsync(RefreshTokenRequest refreshTokenRequest);
        Task<bool> RemoveRefreshTokenAsync(string userId);
    }
}
