namespace SecureWebshop.Application.Requests
{
    public class QueryRequest
    {
        public string Search { get; set; } = string.Empty;
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }
}
