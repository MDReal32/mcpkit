use crate::install::resolve_installed_binary_path::resolve_installed_binary_path;
use crate::install::sibling_server_path::sibling_server_path;
use crate::platform::Target;
use std::path::{Path, PathBuf};

pub fn resolve_installed_server_path(home_dir: &Path, target: Target) -> PathBuf {
    sibling_server_path(&resolve_installed_binary_path(home_dir, target), target)
}
