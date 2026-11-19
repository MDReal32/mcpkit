use crate::binary_error::BinaryError;
use crate::install::io_failure::io_failure;
use std::path::Path;

/// Whether a file is at `path`; a path that cannot be checked is an error, not a missing file.
pub fn path_exists(path: &Path) -> Result<bool, BinaryError> {
    path.try_exists().map_err(|error| io_failure("read", path, error))
}
