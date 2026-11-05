use crate::binary_error::BinaryError;
use crate::install::io_failure::io_failure;
use crate::install::place_binary_file::place_binary_file;
use std::path::Path;

/// Replaces the binary atomically through a temporary file next to it, which is removed again when that fails.
pub fn write_binary_file(path: &Path, bytes: &[u8]) -> Result<(), BinaryError> {
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(|error| io_failure("create", parent, error))?;
    }
    let mut temporary = path.as_os_str().to_owned();
    temporary.push(format!(".{}.tmp", std::process::id()));
    let temporary_path = Path::new(&temporary);
    let Err(error) = place_binary_file(path, temporary_path, bytes) else {
        return Ok(());
    };
    match std::fs::remove_file(temporary_path) {
        Ok(()) => Err(error),
        Err(cleanup) if cleanup.kind() == std::io::ErrorKind::NotFound => Err(error),
        Err(cleanup) => Err(BinaryError(format!(
            "{error} (and removing {} failed: {cleanup})",
            temporary_path.display()
        ))),
    }
}
