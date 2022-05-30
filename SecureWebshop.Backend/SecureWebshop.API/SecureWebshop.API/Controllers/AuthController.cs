using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Requests.Auth;
using SecureWebshop.Application.Responses.Auth;
using SecureWebshop.Application.Services.Auth;
using SecureWebshop.Application.Services.Users;

namespace SecureWebshop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : BaseApiController
    {
        private readonly IAuthService _authService;
        private readonly ITokenService _tokenService;
        private readonly IUserService _userService;

        public AuthController(IAuthService authService, ITokenService tokenService, IUserService userService)
        {
            _authService = authService;
            _tokenService = tokenService;
            _userService = userService;
        }

        [AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login(LoginRequest request)
        {
            if (request == null)
                return BadRequest(new TokenResponse { Error = "Missing login details" });

            var response = await _authService.LoginAsync(request);

            return response.Success ? Ok(response) : Unauthorized(new { response.Error });
        }

        [AllowAnonymous]
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshToken(RefreshTokenRequest request)
        {
            if (request == null)
                return BadRequest(new TokenResponse { Error = "Missing refresh token details" });

            var validateRefreshTokenResponse = await _tokenService.ValidateRefreshTokenAsync(request);
            if (!validateRefreshTokenResponse.Success)
                return Unauthorized(validateRefreshTokenResponse);

            var newTokens = await _tokenService.GenerateTokensAsync(validateRefreshTokenResponse.UserId);
            var tokenResponse = new TokenResponse { AccessToken = newTokens.Item1, RefreshToken = newTokens.Item2 };

            return Ok(tokenResponse);
        }

        [AllowAnonymous]
        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(SignupRequest request)
        {
            var response = await _authService.SignupAsync(request);

            return response.Success ? Ok(response.Email) : BadRequest(response);
        }

        [AllowAnonymous]
        [HttpGet("EmailExists/{email}")]
        public async Task<IActionResult> CheckEmail([FromRoute] string email)
        {
            bool emailExists = await _userService.EmailExists(email);

            return Ok(new { emailExists });
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<IActionResult> Logout()
        {
            var response = await _authService.LogoutAsync(UserId);

            return response.Success ? Ok() : BadRequest(response);
        }
    }
}
