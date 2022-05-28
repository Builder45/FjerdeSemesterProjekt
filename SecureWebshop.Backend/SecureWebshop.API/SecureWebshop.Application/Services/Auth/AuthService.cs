using SecureWebshop.Application.Helpers;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly IGenericRepo<User> _genericUserRepo;
        private readonly ITokenService _tokenService;
        public AuthService(IGenericRepo<User> genericUserRepo, ITokenService tokenService)
        {
            _genericUserRepo = genericUserRepo;
            _tokenService = tokenService;
        }

        public async Task<TokenResponse> LoginAsync(LoginRequest request)
        {
            var response = new TokenResponse() { Success = false };

            var user = await _genericUserRepo.GetByCondition(user => user.Email == request.Email && user.IsActive == true);

            if (user == null)
            {
                response.Error = "Email not found";
                return response;
            }

            var requestPasswordHash = HashHelper.HashUsingPbkdf2(request.Password, Convert.FromBase64String(user.PasswordSalt));
            
            if (user.PasswordHash != requestPasswordHash)
            {
                response.Error = "Invalid password";
                return response;
            }

            var tokens = await Task.Run(() => _tokenService.GenerateTokensAsync(user.Id));

            response.Success = true;
            response.UserId = user.Id;
            response.AccessToken = tokens.Item1;
            response.RefreshToken = tokens.Item2;
            return response;
        }

        public async Task<LogoutResponse> LogoutAsync(string userId)
        {
            // Ingen bruger? Logout = success
            var user = await _genericUserRepo.Get(userId);
            if (user == null)
                return new LogoutResponse { Success = true };

            // Ingen token? Logout = success
            if (user.RefreshToken == null)
                return new LogoutResponse { Success = true };

            try
            {
                await _tokenService.RemoveRefreshTokenAsync(user.Id);
                return new LogoutResponse { Success = true };
            }
            catch (Exception)
            {
                return new LogoutResponse { Success = false, Error = "Unable to logout user" };
            }
        }

        public async Task<SignupResponse> SignupAsync(SignupRequest request)
        {
            var response = new SignupResponse { Success = false };

            if (!ValidationHelper.EmailIsValid(request.Email))
            {
                response.Error = "Email is invalid";
                return response;
            }

            // Hvis brugeren eksister
            var existingUser = await _genericUserRepo.GetByCondition(user => user.Email == request.Email);
            if (existingUser != null)
            {
                response.Error = "User with the same email already exists!";
                return response;
            }

            if (!ValidationHelper.PasswordIsValid(request.Password))
            {
                response.Error = "Password is not strong enough";
                return response;
            }

            var salt = HashHelper.GenerateSecureSalt();
            var passwordHash = HashHelper.HashUsingPbkdf2(request.Password, salt);

            var user = new User
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = Convert.ToBase64String(salt),
                FirstName = request.FirstName,
                LastName = request.LastName,
                PhoneNumber = request.PhoneNumber,
                CreationDate = DateTime.Now,
                IsActive = true
            };

            try
            {
                await _genericUserRepo.CreateOrUpdate(user);
                response.Success = true;
                response.Email = user.Email;
                return response;
            }
            catch (Exception)
            {
                response.Error = "Unable to save user";
                return response;
            }
        }
    }
}
