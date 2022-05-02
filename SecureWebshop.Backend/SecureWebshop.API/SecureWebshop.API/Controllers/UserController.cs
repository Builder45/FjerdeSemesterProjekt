using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.Application.Dtos;
using SecureWebshop.Application.UseCases.UserUC;

namespace SecureWebshop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ICreateUser _createUser;

        public UserController(ICreateUser createUser)
        {
            _createUser = createUser;
        }

        [HttpPost]
        public IActionResult Create(UserDto userDto) 
        {
            _createUser.Create(userDto);
            return Ok();
        }
    }
}
