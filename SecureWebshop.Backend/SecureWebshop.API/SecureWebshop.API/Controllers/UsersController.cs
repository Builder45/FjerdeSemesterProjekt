using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Responses.Users;
using SecureWebshop.Application.Services.Users;

namespace SecureWebshop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : BaseApiController
    {
        private readonly IUserService _userService;

        public UsersController(IUserService userService)
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("GetProfile")]
        public async Task<IActionResult> GetProfile()
        {
            if (UserId == null)
            {
                return Unauthorized(new UserProfileResponse
                {
                    Error = "Access denied!",
                    ErrorCode = "Unauthorized"
                });
            }

            var userProfileResponse = await _userService.GetUserProfile(UserId);

            if (!userProfileResponse.Success)
            {
                return BadRequest(userProfileResponse);
            }

            return Ok(userProfileResponse);
        }
    }
}
