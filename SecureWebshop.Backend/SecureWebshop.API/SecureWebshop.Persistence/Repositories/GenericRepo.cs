using Raven.Client.Documents;
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

        public async Task CreateOrUpdate(T entity)
        {
            using var session = _context.Store.OpenAsyncSession();
            await session.StoreAsync(entity);
            await session.SaveChangesAsync();
        }

        public async Task Delete(string id)
        {
            using var session = _context.Store.OpenAsyncSession();
            var entity = session.LoadAsync<T>(id);
            session.Delete(entity);
            await session.SaveChangesAsync();
        }

        public async Task<T> Get(string id)
        {
            using var session = _context.Store.OpenAsyncSession();
            var entity = await session.LoadAsync<T>(id);
            return entity;
        }

        public async Task<IEnumerable<T>> GetAll(int pageSize, int pageNumber)
        {
            int skip = pageSize * (pageNumber - 1);
            int take = pageSize;

            using var session = _context.Store.OpenAsyncSession();

            var entities = await session
                .Query<T>()
                .Skip(skip)
                .Take(take)
                .ToListAsync();

            return entities;
        }
    }
}
