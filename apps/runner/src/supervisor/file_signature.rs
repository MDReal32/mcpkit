use std::path::Path;
use std::time::UNIX_EPOCH;

/// Changes whenever the file is replaced or rewritten.
pub async fn read_file_signature(path: &Path) -> std::io::Result<String> {
    let metadata = tokio::fs::metadata(path).await?;
    let modified = metadata
        .modified()?
        .duration_since(UNIX_EPOCH)
        .map(|time| time.as_nanos())
        .unwrap_or_default();
    Ok(format!("{}:{}:{}", file_identity(&metadata), metadata.len(), modified))
}

#[cfg(unix)]
fn file_identity(metadata: &std::fs::Metadata) -> u64 {
    std::os::unix::fs::MetadataExt::ino(metadata)
}

#[cfg(not(unix))]
fn file_identity(metadata: &std::fs::Metadata) -> u64 {
    metadata
        .created()
        .ok()
        .and_then(|time| time.duration_since(UNIX_EPOCH).ok())
        .map_or(0, |time| time.as_secs())
}
