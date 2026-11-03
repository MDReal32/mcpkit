use mcpkit_registry::{Fetch, RegistryContext, read_cached_index, sync_registry};

/// No manifests ship in the binary, so with no index on disk the first sync is awaited; a failed one is reported and
/// left to the caller, which finds no index. Nothing else is updated while serving: `mcpkit update` refreshes the cache.
pub async fn ensure_manifest_index<F: Fetch>(context: &RegistryContext<F>) -> Result<(), String> {
    if read_cached_index(&context.dir)
        .await
        .map_err(|error| error.to_string())?
        .is_some()
    {
        return Ok(());
    }
    if let Err(error) = sync_registry(context).await {
        (context.warn)(&format!("mcpkit: registry sync failed: {error}"));
    }
    Ok(())
}
