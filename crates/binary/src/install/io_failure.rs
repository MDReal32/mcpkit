use crate::binary_error::BinaryError;
use std::path::Path;

pub fn io_failure(action: &str, path: &Path, error: std::io::Error) -> BinaryError {
    BinaryError(format!("cannot {action} {}: {error}", path.display()))
}
