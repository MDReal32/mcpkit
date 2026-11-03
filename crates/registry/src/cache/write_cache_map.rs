use crate::cache::cache_map::CacheMap;
use crate::consts::CACHE_FILE_NAME;
use crate::local::write_text;
use crate::registry_error::RegistryError;
use std::path::Path;

/// Written aside and renamed into place, so a reader never sees half a map.
pub async fn write_cache_map(dir: &Path, map: &CacheMap) -> Result<(), RegistryError> {
    let file = dir.join(CACHE_FILE_NAME);
    let pending = dir.join(format!("{CACHE_FILE_NAME}.{}.tmp", std::process::id()));
    let text = serde_json::to_string_pretty(map).map_err(|error| RegistryError::failed(error.to_string()))?;
    write_text(&pending, &format!("{text}\n")).await?;
    tokio::fs::rename(&pending, &file)
        .await
        .map_err(|error| RegistryError::failed(format!("{}: {error}", file.display())))
}
