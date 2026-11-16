use crate::platform::{Target, WINDOW_BINARY_NAME, to_binary_file_name};
use std::path::{Path, PathBuf};

/// The credentials window next to a runner, where the server opens it from.
pub fn sibling_window_path(runner_path: &Path, target: Target) -> PathBuf {
    runner_path.with_file_name(to_binary_file_name(target, WINDOW_BINARY_NAME))
}
