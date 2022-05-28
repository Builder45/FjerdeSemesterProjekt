using Raven.Client.Documents;
using SecureWebshop.Application.Repositories;
using SecureWebshop.Persistence.Context;
using System.Globalization;
using System.Linq.Expressions;

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

        public async Task<T> GetByCondition(Expression<Func<T, bool>> condition)
        {
            using var session = _context.Store.OpenAsyncSession();
            var entity = await session.Query<T>().FirstOrDefaultAsync(condition, default);
            return entity;
        }

        public async Task<Dictionary<string, T>> GetRange(List<string> idList)
        {
            using var session = _context.Store.OpenAsyncSession();
            var entities = await session.LoadAsync<T>(idList);
            return entities;
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

        public async Task<IEnumerable<T>> GetAllByCondition(int pageSize, int pageNumber, Func<T, bool> condition)
        {
            int skip = pageSize * (pageNumber - 1);
            int take = pageSize;

            using var session = _context.Store.OpenAsyncSession();

            var entities = await session
                .Query<T>()
                .ToListAsync();

            entities = entities
                .Where(condition)
                .ToList();

            entities = entities
                .Skip(skip)
                .Take(take)
                .ToList();

            return entities;
        }
    }
}
