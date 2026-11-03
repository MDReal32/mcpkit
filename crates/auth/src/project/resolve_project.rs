use crate::project::parse_remote_host::parse_remote_host;
use crate::project::project_info::ProjectInfo;
use crate::project::read_git_output::read_git_output;
use std::path::Path;

/// The project a call belongs to: its git root (else the directory itself) and the host of its `origin` remote.
pub async fn resolve_project(directory: &Path) -> ProjectInfo {
    let root = read_git_output(directory, &["rev-parse", "--show-toplevel"]).await;
    let remote = match &root {
        Some(root) => read_git_output(Path::new(root), &["remote", "get-url", "origin"]).await,
        None => None,
    };
    ProjectInfo {
        key: root.unwrap_or_else(|| directory.to_string_lossy().into_owned()),
        remote_host: remote.as_deref().and_then(parse_remote_host),
    }
}
