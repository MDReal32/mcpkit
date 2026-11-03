use crate::upstream_error::UpstreamError;
use std::io::ErrorKind;
use std::path::Path;

/// `rm -rf`: a folder that is not there is already removed.
pub async fn remove_directory(dir: &Path) -> Result<(), UpstreamError> {
    match tokio::fs::remove_dir_all(dir).await {
        Err(error) if error.kind() != ErrorKind::NotFound => {
            Err(UpstreamError::new(format!("cannot remove {}: {error}", dir.display())))
        }
        _ => Ok(()),
    }
}
