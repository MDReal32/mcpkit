use crate::repo::consts::READY_MARKER_FILE_NAME;
use crate::repo::repo_state::RepoState;
use crate::repo::sibling_path::sibling_path;
use crate::upstream_error::UpstreamError;
use std::path::Path;

/// Writes the marker through a temporary file, so a reader never sees half of it.
pub async fn write_repo_state(dir: &Path, state: &RepoState) -> Result<(), UpstreamError> {
    let marker = dir.join(READY_MARKER_FILE_NAME);
    let pending = sibling_path(&marker, &format!(".{}.tmp", std::process::id()));
    let cannot_write = |error: String| UpstreamError::new(format!("cannot write {}: {error}", marker.display()));
    let text = serde_json::to_string(state).map_err(|error| cannot_write(error.to_string()))?;
    tokio::fs::write(&pending, text)
        .await
        .map_err(|error| cannot_write(error.to_string()))?;
    tokio::fs::rename(&pending, &marker)
        .await
        .map_err(|error| cannot_write(error.to_string()))
}
