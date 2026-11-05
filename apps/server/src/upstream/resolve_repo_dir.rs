use crate::upstream::consts::REPOS_DIR_NAME;
use std::path::{Path, PathBuf};
use usemcpkit_manifest::Manifest;

/// `~/.usemcpkit/repos/<category>/<name>`: where the repository of one upstream server is cloned.
pub fn resolve_repo_dir(home: &Path, manifest: &Manifest) -> PathBuf {
    home.join(REPOS_DIR_NAME).join(&manifest.category).join(&manifest.name)
}
