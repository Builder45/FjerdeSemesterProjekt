using SecureWebshop.Application.Responses.Users;

namespace SecureWebshop.Application.Services.Users
{
    public interface IUserService
    {
        Task<bool> EmailExists(string email);
        Task<UserProfileResponse> GetUserProfile(string userId);
    }
}