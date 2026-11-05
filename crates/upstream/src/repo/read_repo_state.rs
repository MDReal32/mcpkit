use crate::repo::consts::READY_MARKER_FILE_NAME;
use crate::repo::parse_repo_state::parse_repo_state;
use crate::repo::repo_state::RepoState;
use crate::upstream_error::UpstreamError;
use std::io::ErrorKind;
use std::path::Path;

/// What is known about the clone in `dir`, or `None` when there is no finished clone.
pub async fn read_repo_state(dir: &Path) -> Result<Option<RepoState>, UpstreamError> {
    let marker = dir.join(READY_MARKER_FILE_NAME);
    match tokio::fs::read_to_string(&marker).await {
        Ok(text) => Ok(Some(parse_repo_state(&text))),
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(None),
        Err(error) => Err(UpstreamError::new(format!("cannot read {}: {error}", marker.display()))),
    }
}
