using AutoMapper;
using StartupBuddy.Domain.Interfaces;

namespace StartupBuddy.BusinessLogic
{
    public class BaseBusinessLogic
    {
        protected readonly IIdentityContext identityContext;
        protected readonly IUnitOfWork unitOfWork;
        protected IMapper mapper;

        public BaseBusinessLogic(IIdentityContext identityContext, IUnitOfWork unitOfWork, IMapper mapper)
        {
            this.identityContext = identityContext;
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
        }
    }
}