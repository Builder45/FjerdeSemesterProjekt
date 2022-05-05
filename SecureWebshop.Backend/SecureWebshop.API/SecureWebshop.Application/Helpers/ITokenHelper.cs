
namespace SecureWebshop.Application.Helpers
{
    public interface ITokenHelper
    {
        Task<string> GenerateAccessToken(string userId, bool userIsAdmin);
        Task<string> GenerateRefreshToken();
    }
}