using SecureWebshop.Application.Repositories;
using SecureWebshop.Application.Dtos;
using SecureWebshop.Domain.Entities;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public class CreateUser : ICreateUser
    {
        private readonly IGenericRepo<User> _repo;

        public CreateUser(IGenericRepo<User> repo)
        {
            _repo = repo;
        }

        public void Create(UserDto userDto)
        {
            var user = new User
            {
                Email = userDto.Email,
                HashedPassword = userDto.HashedPassword,
                Name = userDto.Name,
                PhoneNumber = userDto.PhoneNumber
            };

            foreach (var addressDto in userDto.Addresses)
            {
                var address = new Address
                {
                    Name = addressDto.Name,
                    Street = addressDto.Street,
                    PostalCode = addressDto.PostalCode
                };
                user.Addresses.Add(address);
            }

            _repo.CreateOrUpdate(user);
        }
    }
}
