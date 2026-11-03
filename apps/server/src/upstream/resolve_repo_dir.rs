use crate::upstream::consts::REPOS_DIR_NAME;
use mcpkit_manifest::Manifest;
use std::path::{Path, PathBuf};

/// `~/.mcpkit/repos/<category>/<name>`: where the repository of one upstream server is cloned.
pub fn resolve_repo_dir(home: &Path, manifest: &Manifest) -> PathBuf {
    home.join(REPOS_DIR_NAME).join(&manifest.category).join(&manifest.name)
}
