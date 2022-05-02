using SecureWebshop.Application.Dtos;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public interface ICreateUser
    {
        void Create(UserDto userDto);
    }
}