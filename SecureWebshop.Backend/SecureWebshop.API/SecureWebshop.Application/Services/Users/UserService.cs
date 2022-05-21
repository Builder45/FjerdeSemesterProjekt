﻿using SecureWebshop.Application.Helpers;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests.Users;
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

        public async Task<bool> EmailExists(string email)
        {
            var user = await _userRepo.GetByEmail(email);
            return user != null;
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
                    Error = "User doesn't exist"
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

        public async Task<UserUpdatedResponse> UpdateUserInfo(UpdateUserInfoRequest request)
        {
            var user = await _genericUserRepo.Get(request.UserId);

            if (user == null)
            {
                return new UserUpdatedResponse
                {
                    Success = false,
                    Error = "User doesn't exist"
                };
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.PhoneNumber = request.PhoneNumber;

            await _genericUserRepo.CreateOrUpdate(user);

            return new UserUpdatedResponse { Success = true };
        }

        public async Task<UserUpdatedResponse> UpdateUserPassword(UpdateUserPasswordRequest request)
        {
            var user = await _genericUserRepo.Get(request.UserId);

            if (user == null)
            {
                return new UserUpdatedResponse
                {
                    Success = false,
                    Error = "User doesn't exist"
                };
            }

            var passwordIsValid = ValidationHelper.PasswordIsValid(request.Password);

            if (!passwordIsValid)
            {
                return new UserUpdatedResponse
                {
                    Success = false,
                    Error = "The new password is not valid"
                };
            }

            var passwordHash = HashHelper.HashUsingPbkdf2(request.Password, Convert.FromBase64String(user.PasswordSalt));
            user.PasswordHash = passwordHash;

            await _genericUserRepo.CreateOrUpdate(user);

            return new UserUpdatedResponse { Success = true };
        }

        public async Task<UserUpdatedResponse> CreateUserAddress(CreateUserAddressRequest request)
        {
            throw new NotImplementedException();
        }
    }
}
