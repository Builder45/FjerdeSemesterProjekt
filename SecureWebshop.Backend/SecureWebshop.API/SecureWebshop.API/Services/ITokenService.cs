namespace SecureWebshop.API.Services
{
    public interface ITokenService
    {
        Task<string> GenerateAccessToken(string userId, string email, bool isAdmin);
        Task<string> GenerateRefreshToken();
    }
}