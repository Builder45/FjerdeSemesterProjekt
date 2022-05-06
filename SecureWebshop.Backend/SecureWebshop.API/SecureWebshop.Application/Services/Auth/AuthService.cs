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
        private readonly IUserRepo _userRepo;
        private readonly ITokenService _tokenService;
        public AuthService(IGenericRepo<User> genericUserRepo, IUserRepo userRepo, ITokenService tokenService)
        {
            _genericUserRepo = genericUserRepo;
            _userRepo = userRepo;
            _tokenService = tokenService;
        }

        public async Task<TokenResponse> LoginAsync(LoginRequest loginRequest)
        {
            var response = new TokenResponse() { Success = false };

            var user = await _userRepo.GetActiveUserByEmail(loginRequest.Email);

            if (user == null)
            {
                response.Error = "Email not found";
                response.ErrorCode = "L02";
                return response;
            }

            var requestPasswordHash = HashHelper.HashUsingPbkdf2(loginRequest.Password, Convert.FromBase64String(user.PasswordSalt));
            
            if (user.PasswordHash != requestPasswordHash)
            {
                response.Error = "Invalid password";
                response.ErrorCode = "L03";
                return response;
            }

            var tokens = await Task.Run(() => _tokenService.GenerateTokensAsync(user.Id));

            response.Success = true;
            response.UserId = user.Id;
            response.AccessToken = tokens.Item1;
            response.RefreshToken = tokens.Item2;
            response.AccessTokenExpiration = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + 1000 * 60 * 1;
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
                return new LogoutResponse { Success = false, Error = "Unable to logout user", ErrorCode = "L04" };
            }
        }

        public async Task<SignupResponse> SignupAsync(SignupRequest signupRequest)
        {
            var response = new SignupResponse { Success = false };

            if (!ValidationHelper.EmailIsValid(signupRequest.Email))
            {
                response.Error = "Email is invalid";
                response.ErrorCode = "S04";
                return response;
            }

            // Hvis brugeren eksist
            var existingUser = await _userRepo.GetByEmail(signupRequest.Email);
            if (existingUser != null)
            {
                response.Error = "User with the same email already exists!";
                response.ErrorCode = "S02";
                return response;
            }

            if (!ValidationHelper.PasswordIsValid(signupRequest.Password))
            {
                response.Error = "Password is not strong enough";
                response.ErrorCode = "S04";
                return response;
            }

            var salt = HashHelper.GenerateSecureSalt();
            var passwordHash = HashHelper.HashUsingPbkdf2(signupRequest.Password, salt);

            var user = new User
            {
                Email = signupRequest.Email,
                PasswordHash = passwordHash,
                PasswordSalt = Convert.ToBase64String(salt),
                FirstName = signupRequest.FirstName,
                LastName = signupRequest.LastName,
                PhoneNumber = signupRequest.PhoneNumber,
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
                response.ErrorCode = "S05";
                return response;
            }
        }
    }
}
