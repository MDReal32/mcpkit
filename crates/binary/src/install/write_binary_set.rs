use crate::binary_error::BinaryError;
use crate::binary_set::BinarySet;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::sibling_window_path::sibling_window_path;
use crate::install::write_binary_file::write_binary_file;
use crate::platform::Target;
use std::path::Path;

/// Writes the runner first, the window next and the server last: a running runner swaps its server once that file
/// changes, and by then the set on disk is complete.
pub fn write_binary_set(runner_path: &Path, target: Target, binaries: &BinarySet) -> Result<(), BinaryError> {
    write_binary_file(runner_path, &binaries.runner)?;
    write_binary_file(&sibling_window_path(runner_path, target), &binaries.window)?;
    write_binary_file(&sibling_server_path(runner_path, target), &binaries.server)
}
