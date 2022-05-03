using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.Repositories
{
    public interface IUserRepo
    {
        User GetByEmail(string email);
    }
}