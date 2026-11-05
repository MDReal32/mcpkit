use crate::binary_error::BinaryError;
use crate::install::io_failure::io_failure;
use std::path::Path;

/// Writes `bytes` to `temporary_path`, makes it executable and moves it over `path`. Windows cannot overwrite a
/// running .exe but can rename it, so there the current file is moved aside to `<path>.old` first; the next
/// replacement deletes it.
pub fn place_binary_file(path: &Path, temporary_path: &Path, bytes: &[u8]) -> Result<(), BinaryError> {
    std::fs::write(temporary_path, bytes).map_err(|error| io_failure("write", temporary_path, error))?;
    #[cfg(unix)]
    {
        use crate::consts::EXECUTABLE_MODE;
        use std::os::unix::fs::PermissionsExt;
        std::fs::set_permissions(temporary_path, std::fs::Permissions::from_mode(EXECUTABLE_MODE))
            .map_err(|error| io_failure("make executable", temporary_path, error))?;
    }
    #[cfg(windows)]
    {
        use crate::consts::REPLACED_BINARY_SUFFIX;
        use crate::install::ignore_missing_file::ignore_missing_file;
        let mut replaced = path.as_os_str().to_owned();
        replaced.push(REPLACED_BINARY_SUFFIX);
        let replaced_path = Path::new(&replaced);
        ignore_missing_file(std::fs::remove_file(replaced_path))
            .map_err(|error| io_failure("remove", replaced_path, error))?;
        ignore_missing_file(std::fs::rename(path, replaced_path))
            .map_err(|error| io_failure("move aside", path, error))?;
    }
    std::fs::rename(temporary_path, path).map_err(|error| io_failure("replace", path, error))
}
