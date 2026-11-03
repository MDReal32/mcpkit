use std::io::ErrorKind;
use std::path::Path;

/// A regular file the user may run. Windows runs any file it finds by extension, so there only the file counts; an
/// error that only means "not at this PATH entry" is a miss, any other one is returned.
pub fn is_executable_file(file: &Path) -> Result<bool, std::io::Error> {
    let metadata = match std::fs::metadata(file) {
        Ok(metadata) => metadata,
        Err(error)
            if matches!(
                error.kind(),
                ErrorKind::NotFound
                    | ErrorKind::NotADirectory
                    | ErrorKind::PermissionDenied
                    | ErrorKind::InvalidFilename
            ) =>
        {
            return Ok(false);
        }
        Err(error) => return Err(error),
    };
    Ok(metadata.is_file() && is_executable(&metadata))
}

#[cfg(unix)]
fn is_executable(metadata: &std::fs::Metadata) -> bool {
    use std::os::unix::fs::PermissionsExt;

    metadata.permissions().mode() & 0o111 != 0
}

#[cfg(not(unix))]
fn is_executable(_metadata: &std::fs::Metadata) -> bool {
    true
}
