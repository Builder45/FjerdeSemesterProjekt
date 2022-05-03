using SecureWebshop.Application.Repositories;
using SecureWebshop.Domain.Entities;
using SecureWebshop.Persistence.Context;

namespace SecureWebshop.Persistence.Repositories
{
    public class UserRepo : IUserRepo
    {
        private readonly IRavenDbContext _context;
        public UserRepo(IRavenDbContext context)
        {
            _context = context;
        }

        public User GetByEmail(string email)
        {
            using var session = _context.Store.OpenSession();
            var user = session.Query<User>().FirstOrDefault(user => user.Email == email);
            return user;
        }
    }
}
