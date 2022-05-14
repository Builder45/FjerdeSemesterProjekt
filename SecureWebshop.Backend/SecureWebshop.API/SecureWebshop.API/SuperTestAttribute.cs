using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace SecureWebshop.API
{
    public class SuperTestAttribute : AuthorizationFilterAttribute
    {
        public SuperTestAttribute()
        {
            Console.WriteLine("Super test");
        }
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            throw new NotImplementedException();
        }
    }
}
