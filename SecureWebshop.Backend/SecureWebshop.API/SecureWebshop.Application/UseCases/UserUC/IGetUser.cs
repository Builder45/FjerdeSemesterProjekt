using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public interface IGetUser
    {
        Task<User> GetByEmail(string email);
    }
}