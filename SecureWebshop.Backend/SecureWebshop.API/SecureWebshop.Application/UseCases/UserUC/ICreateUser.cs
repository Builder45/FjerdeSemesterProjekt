using SecureWebshop.Application.Requests.UserRequests;

namespace SecureWebshop.Application.UseCases.UserUC
{
    public interface ICreateUser
    {
        void Create(CreateUserRequest request);
    }
}