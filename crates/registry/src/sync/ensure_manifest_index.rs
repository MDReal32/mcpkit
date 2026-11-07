use crate::cache::read_index_registry;
use crate::local::read_cached_index;
use crate::registry_context::RegistryContext;
use crate::remote::Fetch;
use crate::sync::sync_registry::sync_registry;

/// No manifests ship in the binary, so with no index on disk the first sync is awaited; a failed one is reported and
/// left to the caller, which finds no index. The cache is shared by every version, so an index fetched from another
/// registry folder (an older release, another `USEMCPKIT_REGISTRY`, or one that noted none) is synced once too, and
/// kept when that fails. Nothing else is updated while serving: `usemcpkit update` refreshes the cache.
pub async fn ensure_manifest_index<F: Fetch>(context: &RegistryContext<F>) -> Result<(), String> {
    let cached = read_cached_index(&context.dir)
        .await
        .map_err(|error| error.to_string())?;
    if cached.is_some() && read_index_registry(context).await.as_deref() == Some(context.registry_url.as_str()) {
        return Ok(());
    }
    if let Err(error) = sync_registry(context).await {
        (context.warn)(&format!("usemcpkit: registry sync failed: {error}"));
    }
    Ok(())
}
