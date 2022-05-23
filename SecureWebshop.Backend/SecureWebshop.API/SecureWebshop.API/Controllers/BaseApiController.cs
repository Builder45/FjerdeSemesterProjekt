using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace SecureWebshop.API.Controllers
{
    [Authorize]
    public class BaseApiController : ControllerBase
    {
        protected string? UserId => FindClaim(ClaimTypes.NameIdentifier);
        private string? FindClaim(string claimName)
        {
            var claimsIdentity = HttpContext.User.Identity as ClaimsIdentity;
            var claim = claimsIdentity?.FindFirst(claimName);

            return claim == null ? null : claim.Value;
        }
    }
}
