using Raven.Client.Documents;

namespace SecureWebshop.Persistence.Context
{
    public interface IRavenDbContext
    {
        public IDocumentStore Store { get; }
    }
}