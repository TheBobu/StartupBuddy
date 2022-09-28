using Microsoft.EntityFrameworkCore;
using StartupBuddy.Domain.Interfaces;
using System.Linq.Expressions;

namespace StartupBuddy.Data.Repositories
{
    public class BaseRepository<TEntity, TId> : IBaseRepository<TEntity, TId> where TEntity : class
    {
        protected StartupBuddyContext DbContext { get; }

        public BaseRepository(StartupBuddyContext dbContext)
        {
            DbContext = dbContext ?? throw new ArgumentNullException(nameof(dbContext));
        }

        public async Task<TEntity> Get(TId id)
        {
            return await DbContext.Set<TEntity>().FindAsync(id);
        }

        public async Task<List<TEntity>> GetByPredicate(Expression<Func<TEntity, bool>> predicate)
        {
            return await DbContext.Set<TEntity>().Where(predicate).AsNoTracking().ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await DbContext.Set<TEntity>().ToListAsync();
        }

        public async Task<TEntity> Add(TEntity entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var newEntity = await DbContext.Set<TEntity>().AddAsync(entity);

            return newEntity.Entity;
        }

        public async Task AddRange(IEnumerable<TEntity> entities)
        {
            if (entities == null) throw new ArgumentNullException(nameof(entities));

            await DbContext.Set<TEntity>().AddRangeAsync(entities);
        }

        public void Remove(TId id)
        {
            TEntity entity = DbContext.Set<TEntity>().Find(id);

            if (entity != null)
                DbContext.Set<TEntity>().Remove(entity);
        }

        public TEntity Update(TEntity entity)
        {
            if (entity == null) throw new ArgumentNullException(nameof(entity));

            var newEntity = DbContext.Set<TEntity>().Update(entity);

            return newEntity.Entity;
        }
    }
}