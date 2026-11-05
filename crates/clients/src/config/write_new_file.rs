use std::fs::Metadata;
use std::io::Write;
use std::path::Path;

/// Creates `path` with `text`, with the permissions of `previous` (or 0644 for a new config) on Unix.
pub fn write_new_file(path: &Path, text: &str, previous: Option<&Metadata>) -> std::io::Result<()> {
    let mut options = std::fs::OpenOptions::new();
    options.write(true).create(true).truncate(true);
    #[cfg(unix)]
    {
        use crate::consts::NEW_CONFIG_FILE_MODE;
        use std::os::unix::fs::{OpenOptionsExt, PermissionsExt};
        let mode = previous.map_or(NEW_CONFIG_FILE_MODE, |metadata| metadata.permissions().mode() & 0o7777);
        options.mode(mode);
    }
    #[cfg(not(unix))]
    let _ = previous;
    options.open(path)?.write_all(text.as_bytes())
}
