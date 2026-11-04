use crate::local::write_cached_index;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::{Fetch, fetch_registry_index};
use usemcpkit_manifest::registry::RegistryServer;

/// Runs `load` with the server's entry in the cached index. Opening a server never re-checks the registry, so the
/// index is only fetched again when a download does not match it: the cached index is then older than the registry,
/// and `load` is retried once with the new entry.
pub async fn retry_on_stale_index<F: Fetch, T>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
    load: impl AsyncFn(&RegistryServer) -> Result<T, RegistryError>,
) -> Result<T, RegistryError> {
    let error = match load(server).await {
        Err(error @ RegistryError::ChecksumMismatch(_)) => error,
        other => return other,
    };
    let index = fetch_registry_index(context).await?;
    write_cached_index(context, &index).await?;
    match index.servers.iter().find(|candidate| candidate.id == server.id) {
        Some(fresh) if fresh.sha256 != server.sha256 => load(fresh).await,
        _ => Err(error),
    }
}
