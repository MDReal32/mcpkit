use mcpkit_registry::{HttpFetcher, RegistryContext};

/// The manifest cache under the mcpkit home and the registry named by `registry_url`, `MCPKIT_REGISTRY` or the default.
pub fn create_registry_context(registry_url: Option<&str>) -> Result<RegistryContext<HttpFetcher>, String> {
    let fetcher = HttpFetcher::new().map_err(|error| error.to_string())?;
    RegistryContext::from_env(registry_url, fetcher).map_err(|error| error.to_string())
}
