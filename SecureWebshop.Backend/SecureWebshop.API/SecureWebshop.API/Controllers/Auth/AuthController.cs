using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;
using SecureWebshop.Application.Services.Auth;

namespace SecureWebshop.API.Controllers.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;

        public AuthController(IAuthService authService, ITokenService tokenService)
        {
            _authService = authService;
            _tokenService = tokenService;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            if (loginRequest == null)
            {
                return BadRequest(new TokenResponse
                {
                    Error = "Missing login details",
                    ErrorCode = "L01"
                });
            }

            var loginResponse = await _authService.LoginAsync(loginRequest);

            if (!loginResponse.Success)
            {
                return Unauthorized(new
                {
                    loginResponse.Error,
                    loginResponse.ErrorCode
                });
            }

            return Ok(loginResponse);
        }

        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest refreshTokenRequest)
        {
            if (refreshTokenRequest == null)
            {
                return BadRequest(new TokenResponse
                {
                    Error = "Missing refresh token details",
                    ErrorCode = "R01"
                });
            }

            var validateRefreshTokenResponse = await _tokenService.ValidateRefreshTokenAsync(refreshTokenRequest);

            if (!validateRefreshTokenResponse.Success)
            {
                return UnprocessableEntity(validateRefreshTokenResponse);
            }

            var newTokens = await _tokenService.GenerateTokensAsync(validateRefreshTokenResponse.UserId);

            var tokenResponse = new TokenResponse
            {
                AccessToken = newTokens.Item1,
                RefreshToken = newTokens.Item2,
                AccessTokenExpiration = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds() + 1000 * 60 * 1
            };

            return Ok(tokenResponse);
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(SignupRequest signupRequest)
        {
            var signupResponse = await _authService.SignupAsync(signupRequest);

            if (!signupResponse.Success)
                return UnprocessableEntity(signupResponse);

            return Ok(signupResponse.Email);
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            var logoutResponse = await _authService.LogoutAsync(UserId);

            if (!logoutResponse.Success)
                return UnprocessableEntity(logoutResponse);

            return Ok();
        }
    }
}
