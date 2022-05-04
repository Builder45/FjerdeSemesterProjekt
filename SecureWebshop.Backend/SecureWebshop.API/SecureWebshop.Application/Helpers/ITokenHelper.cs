
namespace SecureWebshop.Application.Helpers
{
    public interface ITokenHelper
    {
        Task<string> GenerateAccessToken(string userId);
        Task<string> GenerateRefreshToken();
    }
}