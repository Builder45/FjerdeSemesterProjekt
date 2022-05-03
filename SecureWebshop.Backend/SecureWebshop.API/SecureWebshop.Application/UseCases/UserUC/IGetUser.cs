using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public interface IGetUser
    {
        User GetByEmail(string email);
    }
}