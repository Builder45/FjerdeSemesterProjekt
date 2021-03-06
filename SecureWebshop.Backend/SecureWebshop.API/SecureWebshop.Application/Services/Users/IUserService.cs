using SecureWebshop.Application.Requests.Users;
using SecureWebshop.Application.Responses.Users;

namespace SecureWebshop.Application.Services.Users
{
    public interface IUserService
    {
        Task<bool> EmailExists(string email);
        Task<UserProfileResponse> GetUserProfile(string userId);
        Task<UserUpdatedResponse> UpdateUserInfo(UpdateUserInfoRequest request);
        Task<UserUpdatedResponse> UpdateUserPassword(UpdateUserPasswordRequest request);
        Task<UserUpdatedResponse> CreateUserAddress(CreateUserAddressRequest request);
        Task<UserUpdatedResponse> DeleteUserAddress(DeleteUserAddressRequest request);
    }
}