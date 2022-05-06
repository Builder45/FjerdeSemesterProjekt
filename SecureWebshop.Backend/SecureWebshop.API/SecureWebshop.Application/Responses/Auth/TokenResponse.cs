namespace SecureWebshop.Application.Responses.Auth
{
    public class TokenResponse : BaseResponse
    {
        public string UserId { get; set; }
        public string AccessToken { get; set; }
        public long AccessTokenExpiration { get; set; }
        public string RefreshToken { get; set; }
    }
}
