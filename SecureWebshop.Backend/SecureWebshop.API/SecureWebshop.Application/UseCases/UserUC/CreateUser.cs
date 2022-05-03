using SecureWebshop.Application.Repositories;
using SecureWebshop.Domain.Entities;
using SecureWebshop.Application.Requests.UserRequests;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public class CreateUser : ICreateUser
    {
        private readonly IGenericRepo<User> _repo;

        public CreateUser(IGenericRepo<User> repo)
        {
            _repo = repo;
        }

        public void Create(CreateUserRequest request)
        {
            var user = new User
            {
                Email = request.Email,
                HashedPassword = request.HashedPassword,
                Name = request.Name,
                PhoneNumber = request.PhoneNumber
            };

            user.Addresses.Add(
                new Address(request.AddressTitle, request.AddressStreet, request.AddressPostalCode));

            _repo.CreateOrUpdate(user);
        }
    }
}
