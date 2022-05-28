using System.Linq.Expressions;

namespace SecureWebshop.Application.Repositories
{
    public interface IGenericRepo<T>
    {
        Task CreateOrUpdate(T entity);
        Task Delete(string id);
        Task<T> Get(string id);
        Task<T> GetByCondition(Expression<Func<T, bool>> condition);
        Task<Dictionary<string, T>> GetRange(List<string> idList);
        Task<IEnumerable<T>> GetAll(int pageSize, int pageNumber);
        Task<IEnumerable<T>> GetAllByCondition(int pageSize, int pageNumber, Func<T, bool> condition);
    }
}
