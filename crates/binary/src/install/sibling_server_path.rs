use crate::platform::{SERVER_BINARY_NAME, Target, to_binary_file_name};
use std::path::{Path, PathBuf};

/// The server binary next to a runner, where the runner looks for it.
pub fn sibling_server_path(runner_path: &Path, target: Target) -> PathBuf {
    runner_path.with_file_name(to_binary_file_name(target, SERVER_BINARY_NAME))
}
