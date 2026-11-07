use crate::cache::read_cache_map::read_cache_map;
use crate::consts::INDEX_FILE_NAME;
use crate::registry_context::RegistryContext;

/// The registry folder the cached index was fetched from, if the cache map notes one.
pub async fn read_index_registry<F>(context: &RegistryContext<F>) -> Option<String> {
    read_cache_map(context)
        .await
        .shift_remove(INDEX_FILE_NAME)
        .and_then(|entry| entry.registry)
}
