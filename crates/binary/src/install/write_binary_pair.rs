use crate::binary_error::BinaryError;
use crate::binary_pair::BinaryPair;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::write_binary_file::write_binary_file;
use crate::platform::Target;
use std::path::Path;

/// Writes the runner first and the server last: a running runner swaps its server once that file changes, and by then
/// the pair on disk is complete.
pub fn write_binary_pair(runner_path: &Path, target: Target, binaries: &BinaryPair) -> Result<(), BinaryError> {
    write_binary_file(runner_path, &binaries.runner)?;
    write_binary_file(&sibling_server_path(runner_path, target), &binaries.server)
}
