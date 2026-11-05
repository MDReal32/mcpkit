use crate::client_error::ClientError;
use crate::config::with_file_suffix::with_file_suffix;
use crate::config::write_new_file::write_new_file;
use crate::consts::BACKUP_SUFFIX;
use std::io::ErrorKind;
use std::path::Path;

/// Keeps a copy of the previous file at `<path>.usemcpkit-backup`, then swaps the new content in atomically, with the
/// previous file's permissions.
pub fn write_config_text(path: &Path, text: &str) -> Result<(), ClientError> {
    let failed = |action: &str, target: &Path, error: std::io::Error| {
        ClientError(format!("could not {action} {}: {error}", target.display()))
    };
    if let Some(dir) = path.parent() {
        std::fs::create_dir_all(dir).map_err(|error| failed("create", dir, error))?;
    }
    let previous = match std::fs::metadata(path) {
        Ok(metadata) => Some(metadata),
        Err(error) if error.kind() == ErrorKind::NotFound => None,
        Err(error) => return Err(failed("read", path, error)),
    };
    if previous.is_some() {
        let backup = with_file_suffix(path, BACKUP_SUFFIX);
        std::fs::copy(path, &backup).map_err(|error| failed("back up to", &backup, error))?;
    }
    let temporary = with_file_suffix(path, &format!(".{}.tmp", std::process::id()));
    let written = write_new_file(&temporary, text, previous.as_ref()).and_then(|()| std::fs::rename(&temporary, path));
    let Err(error) = written else {
        return Ok(());
    };
    let message = format!("could not write {}: {error}", path.display());
    match std::fs::remove_file(&temporary) {
        Err(cleanup) if cleanup.kind() != ErrorKind::NotFound => Err(ClientError(format!(
            "{message} (and removing {} failed: {cleanup})",
            temporary.display()
        ))),
        _ => Err(ClientError(message)),
    }
}
