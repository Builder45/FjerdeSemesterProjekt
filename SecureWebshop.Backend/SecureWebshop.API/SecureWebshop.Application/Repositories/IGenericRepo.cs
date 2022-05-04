namespace SecureWebshop.Application.Repositories
{
    public interface IGenericRepo<T>
    {
        Task CreateOrUpdate(T entity);
        Task Delete(string id);
        public Task<T> Get(string id);
        public Task<IEnumerable<T>> GetAll(int pageSize, int pageNumber);
    }
}
