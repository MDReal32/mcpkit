use crate::consts::BIN_DIR_NAME;
use crate::platform::{BINARY_NAME, Target, to_binary_file_name};
use std::path::{Path, PathBuf};

/// `<usemcpkit home>/bin/usemcpkit[.exe]`, the runner clients are pointed at.
pub fn resolve_installed_binary_path(home_dir: &Path, target: Target) -> PathBuf {
    home_dir
        .join(BIN_DIR_NAME)
        .join(to_binary_file_name(target, BINARY_NAME))
}
