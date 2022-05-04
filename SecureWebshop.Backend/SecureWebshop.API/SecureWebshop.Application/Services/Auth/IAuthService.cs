using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;

namespace SecureWebshop.Application.Services.Auth
{
    public interface IAuthService
    {
        Task<TokenResponse> LoginAsync(LoginRequest loginRequest);
        Task<SignupResponse> SignupAsync(SignupRequest signupRequest);
        Task<LogoutResponse> LogoutAsync(string userId);
    }
}
