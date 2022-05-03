namespace SecureWebshop.API.Services
{
    public interface ITokenService
    {
        string GenerateToken(string email, bool isAdmin);
    }
}