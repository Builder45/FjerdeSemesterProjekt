using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Repositories
{
    public interface IUserRepo
    {
        Task<User> GetByEmail(string email);
        Task<User> GetActiveUserByEmail(string email);
    }
}