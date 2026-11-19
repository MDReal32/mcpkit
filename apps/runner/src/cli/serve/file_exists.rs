use std::path::Path;

/// Whether a file is at `path`; a path that cannot be checked is an error, not a missing file.
pub fn file_exists(path: &Path) -> Result<bool, String> {
    path.try_exists()
        .map_err(|error| format!("cannot read {}: {error}", path.display()))
}
