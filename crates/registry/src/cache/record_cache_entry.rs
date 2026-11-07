use crate::cache::cache_entry::CacheEntry;
use crate::cache::cache_map_lock::CACHE_MAP_LOCK;
use crate::cache::read_cache_map::read_cache_map;
use crate::cache::to_cache_path::to_cache_path;
use crate::cache::write_cache_map::write_cache_map;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use std::path::Path;
use usemcpkit_core::hash::sha256_hex;

/// Notes that `text` is what `file` holds now and is current, fetched from `registry` when given; `updated_at` moves
/// only when the content differs from the last one noted.
pub async fn record_cache_entry<F>(
    context: &RegistryContext<F>,
    file: &Path,
    text: &str,
    registry: Option<&str>,
    now: u64,
) -> Result<(), RegistryError> {
    let path = to_cache_path(&context.dir, file);
    let _locked = CACHE_MAP_LOCK.lock().await;
    let mut map = read_cache_map(context).await;
    let sha256 = sha256_hex(text);
    let updated_at = match map.get(&path) {
        Some(previous) if previous.sha256 == sha256 => previous.updated_at,
        _ => now,
    };
    map.insert(
        path,
        CacheEntry {
            updated_at,
            checked_at: now,
            sha256,
            registry: registry.map(str::to_owned),
        },
    );
    write_cache_map(&context.dir, &map).await
}
