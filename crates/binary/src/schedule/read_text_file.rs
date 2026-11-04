use crate::binary_error::BinaryError;
use std::io::ErrorKind;
use std::path::Path;

/// `None` when the file does not exist.
pub fn read_text_file(path: &Path) -> Result<Option<String>, BinaryError> {
    match std::fs::read_to_string(path) {
        Ok(text) => Ok(Some(text)),
        Err(error) if error.kind() == ErrorKind::NotFound => Ok(None),
        Err(error) => Err(BinaryError(format!("cannot read {}: {error}", path.display()))),
    }
}
