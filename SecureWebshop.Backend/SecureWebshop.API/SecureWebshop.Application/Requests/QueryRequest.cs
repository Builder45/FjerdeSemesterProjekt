using System.ComponentModel.DataAnnotations;

namespace SecureWebshop.Application.Requests
{
    public class QueryRequest
    {
        public string Search { get; set; } = string.Empty;

        [Range(1, 1000)]
        public int PageSize { get; set; } = 10;

        [Range(1, 100000)]
        public int PageNumber { get; set; } = 1;
    }
}
