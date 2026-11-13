use std::path::Path;

/// Writes a cache file, creating its folder.
pub async fn write_cache_file(file: &Path, text: &str) -> Result<(), String> {
    if let Some(parent) = file.parent() {
        tokio::fs::create_dir_all(parent)
            .await
            .map_err(|error| format!("cannot create {}: {error}", parent.display()))?;
    }
    tokio::fs::write(file, text)
        .await
        .map_err(|error| format!("cannot write {}: {error}", file.display()))
}
