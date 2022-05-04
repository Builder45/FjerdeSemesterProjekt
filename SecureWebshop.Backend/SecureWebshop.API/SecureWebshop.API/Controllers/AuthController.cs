using BCrypt.Net;
using BC = BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Mvc;
using SecureWebshop.API.Dtos;
using SecureWebshop.API.Lib;
using SecureWebshop.Application.Requests.UserRequests;
using SecureWebshop.Application.UseCases.UserUC;
using SecureWebshop.API.Services;

namespace SecureWebshop.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        //private readonly ITokenService _tokenService;
        //private readonly ICreateUser _createUser;
        //private readonly IGetUser _getUser;

        //public AuthController(ITokenService tokenService, ICreateUser createUser, IGetUser getUser)
        //{
        //    _tokenService = tokenService;
        //    _createUser = createUser;
        //    _getUser = getUser;
        //}

        //[HttpPost("Signup")]
        //[ProducesResponseType(StatusCodes.Status201Created)]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //[ProducesResponseType(StatusCodes.Status400BadRequest)]
        //[ProducesResponseType(StatusCodes.Status500InternalServerError)]
        //public IActionResult Create(UserSignupDto userDto)
        //{
        //    if (!Validation.EmailIsValid(userDto.Email))
        //        return BadRequest("INVALID_EMAIL");

        //    if (_getUser.GetByEmail(userDto.Email) != null)
        //        return BadRequest("EMAIL_ALREADY_IN_USE");

        //    if (!Validation.PasswordIsValid(userDto.Password))
        //        return BadRequest("INVALID_PASSWORD");

        //    // Bcrypt enhanced password hashing:
        //    // 1. Prehashing med SHA384
        //    // 2. BCrypt hashing med salt generet med work factor 12:
        //    string hashedPassword = BC.EnhancedHashPassword(userDto.Password, 12, hashType: HashType.SHA384);

        //    try
        //    {
        //        _createUser.Create(new CreateUserRequest
        //        {
        //            Name = userDto.Name,
        //            Email = userDto.Email,
        //            HashedPassword = hashedPassword,
        //            PhoneNumber = userDto.PhoneNumber,
        //            AddressTitle = userDto.Address.Title,
        //            AddressStreet = userDto.Address.Street,
        //            AddressPostalCode = userDto.Address.PostalCode
        //        });
        //    }
        //    catch (Exception)
        //    {
        //        return StatusCode(500);
        //    }

        //    return Ok("User was created succesfully!");
        //}

        //[HttpPost("Login")]
        //public IActionResult Login(LoginDto loginDto)
        //{
        //    if (!Validation.EmailIsValid(loginDto.Email))
        //        return BadRequest("INVALID_EMAIL");

        //    var user = _getUser.GetByEmail(loginDto.Email);
        //    if (user == null)
        //        return BadRequest("EMAIL_NOT_FOUND");

        //    bool passwordIsValid = BC.EnhancedVerify(loginDto.Password, user.HashedPassword, hashType: HashType.SHA384);
        //    if (!passwordIsValid)
        //    {
        //        return BadRequest("PASSWORD_MISMATCH");
        //    }

        //    string token = _tokenService.GenerateToken(loginDto.Email, true);

        //    return Ok(token);
        //}
    }
}
