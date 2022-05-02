using SecureWebshop.Application.Repositories;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.ConsoleTest
{
    public class DbTest
    {
        private readonly IGenericRepo<User> _userRepo;

        public DbTest(IGenericRepo<User> userRepo)
        {
            _userRepo = userRepo;
        }
        public void AddUser(User user)
        {
            _userRepo.CreateOrUpdate(user);
        }
    }
}
