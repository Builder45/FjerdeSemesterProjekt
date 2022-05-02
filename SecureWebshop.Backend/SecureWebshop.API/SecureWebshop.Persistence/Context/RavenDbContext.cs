using Microsoft.Extensions.Options;
using Raven.Client.Documents;
using Raven.Client.Documents.Operations;
using Raven.Client.Exceptions.Database;
using Raven.Client.ServerWide;
using Raven.Client.ServerWide.Operations;
using SecureWebshop.Persistence.Settings;

namespace SecureWebshop.Persistence.Context
{
    public class RavenDbContext : IRavenDbContext
    {
        private readonly DocumentStore _localstore;
        public IDocumentStore Store => _localstore;

        private readonly PersistenceSettings _persistenceSettings;

        public RavenDbContext(IOptionsMonitor<PersistenceSettings> settings)
        {
            _persistenceSettings = settings.CurrentValue;

            _localstore = new DocumentStore()
            {
                Database = _persistenceSettings.Database,
                Urls = _persistenceSettings.Urls
            };

            _localstore.Initialize();
            EnsureDatabaseIsCreated();
        }

        public void EnsureDatabaseIsCreated()
        {
            try
            {
                _localstore.Maintenance.ForDatabase(_persistenceSettings.Database).Send(
                    new GetStatisticsOperation());
            }
            catch (DatabaseDoesNotExistException)
            {
                _localstore.Maintenance.Server.Send(
                    new CreateDatabaseOperation(
                        new DatabaseRecord(_persistenceSettings.Database)));
            }
        }
    }
}
