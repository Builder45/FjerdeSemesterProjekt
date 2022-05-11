namespace SecureWebshop.Application.Requests
{
    public class QueryRequest
    {
        public int PageSize { get; set; } = 10;
        public int PageNumber { get; set; } = 1;
    }
}
