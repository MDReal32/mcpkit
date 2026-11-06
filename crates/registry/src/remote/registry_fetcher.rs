use crate::registry_error::RegistryError;
use crate::remote::embedded_registry::EmbeddedRegistry;
use crate::remote::fetch::Fetch;
use crate::remote::http_fetcher::HttpFetcher;

/// The published registry over HTTP, or the one a dev binary carries.
pub enum RegistryFetcher {
    Http(HttpFetcher),
    Embedded(EmbeddedRegistry),
}

impl Fetch for RegistryFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        match self {
            RegistryFetcher::Http(fetcher) => fetcher.fetch_text(url).await,
            RegistryFetcher::Embedded(registry) => registry.fetch_text(url).await,
        }
    }
}
