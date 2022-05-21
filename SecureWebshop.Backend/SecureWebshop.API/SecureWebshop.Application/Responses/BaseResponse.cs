using System.Text.Json.Serialization;

namespace SecureWebshop.Application.Responses
{
    public abstract class BaseResponse
    {
        [JsonIgnore()]
        public bool Success { get; set; }

        [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
        public string Error { get; set; }
    }
}
