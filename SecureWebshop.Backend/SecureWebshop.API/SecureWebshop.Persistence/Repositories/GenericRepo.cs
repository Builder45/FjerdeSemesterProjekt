using SecureWebshop.Application.Repositories;
using SecureWebshop.Persistence.Context;

namespace SecureWebshop.Persistence.Repositories
{
    public class GenericRepo<T> : IGenericRepo<T>
    {
        private readonly IRavenDbContext _context;
        public GenericRepo(IRavenDbContext context)
        {
            _context = context;
        }

        public void CreateOrUpdate(T entity)
        {
            using var session = _context.Store.OpenSession();
            session.Store(entity);
            session.SaveChanges();
        }

        public void Delete(string id)
        {
            using var session = _context.Store.OpenSession();
            var entity = session.Load<T>(id);
            session.Delete(entity);
            session.SaveChanges();
        }

        public T Get(string id)
        {
            using var session = _context.Store.OpenSession();
            var entity = session.Load<T>(id);
            return entity;
        }

        public IEnumerable<T> GetAll(int pageSize, int pageNumber)
        {
            int skip = pageSize * (pageNumber - 1);
            int take = pageSize;

            using var session = _context.Store.OpenSession();

            var entities = session
                .Query<T>()
                .Skip(skip)
                .Take(take)
                .ToList();

            return entities;
        }
    }
}
