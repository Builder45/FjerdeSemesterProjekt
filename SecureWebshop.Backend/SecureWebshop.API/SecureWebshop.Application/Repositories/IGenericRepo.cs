namespace SecureWebshop.Application.Repositories
{
    public interface IGenericRepo<T>
    {
        void CreateOrUpdate(T entity);
        void Delete(string id);
        public T Get(string id);
        public IEnumerable<T> GetAll(int pageSize, int pageNumber);
    }
}
