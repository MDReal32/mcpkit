use usemcpkit_registry::{RegistryContext, RegistryFetcher, RegistrySource, open_registry_context};

/// The manifest cache under the usemcpkit home and the registry of `source`; a published one may be named by
/// `registry_url` or `USEMCPKIT_REGISTRY`.
pub fn create_registry_context(
    registry_url: Option<&str>,
    source: RegistrySource,
) -> Result<RegistryContext<RegistryFetcher>, String> {
    open_registry_context(registry_url, source).map_err(|error| error.to_string())
}
