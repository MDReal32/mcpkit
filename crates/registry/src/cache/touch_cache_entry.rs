use crate::cache::cache_map_lock::CACHE_MAP_LOCK;
use crate::cache::read_cache_map::read_cache_map;
use crate::cache::to_cache_path::to_cache_path;
use crate::cache::write_cache_map::write_cache_map;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use std::path::Path;

/// Marks a cached file as checked now without changing what is known about its content; unknown files stay unknown.
pub async fn touch_cache_entry<F>(context: &RegistryContext<F>, file: &Path, now: u64) -> Result<(), RegistryError> {
    let path = to_cache_path(&context.dir, file);
    let _locked = CACHE_MAP_LOCK.lock().await;
    let mut map = read_cache_map(context).await;
    let Some(previous) = map.get_mut(&path) else {
        return Ok(());
    };
    previous.checked_at = now;
    write_cache_map(&context.dir, &map).await
}
