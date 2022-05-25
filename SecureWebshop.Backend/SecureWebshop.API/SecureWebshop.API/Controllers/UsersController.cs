using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Requests.Users;
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
        public async Task<IActionResult> GetOwnProfile()
        {
            if (UserId == null)
                return Unauthorized(new { Error = "Access denied!" });

            var response = await _userService.GetUserProfile(UserId);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize]
        [HttpPut("UpdateInformation")]
        public async Task<IActionResult> UpdateOwnInformation(UpdateUserInfoRequest request)
        {
            if (UserId == null)
                return Unauthorized(new { Error = "Access denied!" });

            request.UserId = UserId;
            var response = await _userService.UpdateUserInfo(request);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize]
        [HttpPut("UpdatePassword")]
        public async Task<IActionResult> UpdateOwnPassword(UpdateUserPasswordRequest request)
        {
            if (UserId == null)
                return Unauthorized(new { Error = "Access denied!" });

            request.UserId = UserId;
            var response = await _userService.UpdateUserPassword(request);

            if (!response.Success)
                return BadRequest(response);

            return Ok(response);
        }

        [Authorize]
        [HttpPost("Addresses")]
        public async Task<IActionResult> CreateUserAddress(CreateUserAddressRequest request)
        {
            if (UserId == null)
                return Unauthorized(new { Error = "Access denied!" });

            request.UserId = UserId;
            var response = await _userService.CreateUserAddress(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }

        [Authorize]
        [HttpDelete("Addresses/{title}")]
        public async Task<IActionResult> DeleteUserAddress([FromRoute] string title)
        {
            if (UserId == null)
                return Unauthorized(new { Error = "Access denied!" });

            var request = new DeleteUserAddressRequest();
            request.Title = title;
            request.UserId = UserId;

            var response = await _userService.DeleteUserAddress(request);

            return response.Success ? Ok(response) : BadRequest(response);
        }
    }
}
