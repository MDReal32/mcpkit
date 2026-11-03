use crate::upstream_error::UpstreamError;
use std::io::ErrorKind;
use std::path::Path;

/// Moves `replacement` to `target`; what was there is moved to `previous` first, so `target` is never half-removed.
pub async fn replace_directory(target: &Path, replacement: &Path, previous: &Path) -> Result<(), UpstreamError> {
    let cannot_move = |from: &Path, to: &Path, error: std::io::Error| {
        UpstreamError::new(format!("cannot move {} to {}: {error}", from.display(), to.display()))
    };
    match tokio::fs::rename(target, previous).await {
        Err(error) if error.kind() != ErrorKind::NotFound => return Err(cannot_move(target, previous, error)),
        _ => {}
    }
    tokio::fs::rename(replacement, target)
        .await
        .map_err(|error| cannot_move(replacement, target, error))
}
