using System.Linq.Expressions;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IBaseRepository<TEntity, TId> where TEntity : class
    {
        Task<TEntity> Get(TId id);

        Task<List<TEntity>> GetByPredicate(Expression<Func<TEntity, bool>> condition);

        Task<IEnumerable<TEntity>> GetAll();

        Task<TEntity> Add(TEntity entity);

        Task AddRange(IEnumerable<TEntity> entities);

        void Remove(TId id);

        TEntity Update(TEntity entity);
    }
}