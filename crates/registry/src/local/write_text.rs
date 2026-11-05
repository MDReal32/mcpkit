use crate::registry_error::RegistryError;
use std::path::Path;

/// Writes `text` to `file`, creating the folders above it first.
pub async fn write_text(file: &Path, text: &str) -> Result<(), RegistryError> {
    let describe = |error: std::io::Error| RegistryError::failed(format!("{}: {error}", file.display()));
    if let Some(parent) = file.parent() {
        tokio::fs::create_dir_all(parent).await.map_err(describe)?;
    }
    tokio::fs::write(file, text).await.map_err(describe)
}
