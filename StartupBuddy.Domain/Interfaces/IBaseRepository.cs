using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace StartupBuddy.Domain.Interfaces
{
    public interface IBaseRepository<TEntity, TId> where TEntity : class
    {
        Task<TEntity> Get(TId id);

        Task<List<TEntity>> GetByPredicate(Expression<Func<TEntity, bool>> condition);

        Task<IEnumerable<TEntity>> GetAll();

        Task Add(TEntity entity);

        Task AddRange(IEnumerable<TEntity> entities);

        void Remove(TId id);
    }
}
