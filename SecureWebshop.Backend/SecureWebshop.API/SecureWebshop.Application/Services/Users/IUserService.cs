using SecureWebshop.Application.Responses.Users;

namespace SecureWebshop.Application.Services.Users
{
    public interface IUserService
    {
        Task<UserProfileResponse> GetUserProfile(string userId);
    }
}