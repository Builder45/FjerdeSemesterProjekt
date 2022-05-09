using System.Text.Json.Serialization;

namespace SecureWebshop.Application.Responses.Auth
{
    public class TokenResponse : BaseResponse
    {
        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string UserId { get; set; }
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
