using SecureWebshop.Application.Repositories;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public class GetUser : IGetUser
    {
        private readonly IUserRepo _userRepo;

        public GetUser(IUserRepo userRepo)
        {
            _userRepo = userRepo;
        }

        public User GetByEmail(string email)
        {
            var user = _userRepo.GetByEmail(email);
            return user;
        }
    }
}
