using System.Web.Http;
using System.Web.Http.Controllers;

namespace SecureWebshop.API
{
    public class DefaultDenyAttribute : AuthorizeAttribute
    {
        public DefaultDenyAttribute()
        {
            Console.WriteLine("Default deny initialized");
        }
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            Console.WriteLine("Default deny logic");
            if (actionContext == null)
            {
                throw new ArgumentNullException("actionContext");
            }

            if (actionContext.ActionDescriptor.GetCustomAttributes<AllowAnonymousAttribute>().Any())
                return;

            if (actionContext.ActionDescriptor.GetCustomAttributes<AuthorizeAttribute>().Any())
                return;

            base.HandleUnauthorizedRequest(actionContext);
        }
    }
}
