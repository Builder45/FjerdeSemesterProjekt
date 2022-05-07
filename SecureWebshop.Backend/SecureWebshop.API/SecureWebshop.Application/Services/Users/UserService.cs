using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Responses.Users;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Services.Users
{
    public class UserService : IUserService
    {
        private readonly IGenericRepo<User> _genericUserRepo;
        private readonly IUserRepo _userRepo;

        public UserService(IGenericRepo<User> genericUserRepo, IUserRepo userRepo)
        {
            _genericUserRepo = genericUserRepo;
            _userRepo = userRepo;
        }

        public async Task<UserProfileResponse> GetUserProfile(string userId)
        {

            UserProfileResponse response;
            var user = await _genericUserRepo.Get(userId);

            if (user == null)
            {
                response = new UserProfileResponse
                {
                    Success = false,
                    Error = "User doesn't exist",
                    ErrorCode = "BAD_ID"
                };
                return response;
            }

            response = new UserProfileResponse
            {
                Success = true,
                Email = user.Email,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                Addresses = user.Addresses,
            };

            return response;
        }
    }
}
