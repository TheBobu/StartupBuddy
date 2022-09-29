namespace StartupBuddy.BusinessLogic.Interfaces
{
    public interface IOrganizationTypeBusinessLogic
    {
        Task<List<string>> SuggestOrganizationType();
    }
}