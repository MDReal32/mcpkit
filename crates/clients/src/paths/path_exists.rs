use crate::client_error::ClientError;
use std::path::Path;

/// Whether `path` exists; anything but a missing file (a denied folder, say) is an error.
pub fn path_exists(path: &Path) -> Result<bool, ClientError> {
    path.try_exists()
        .map_err(|error| ClientError(format!("could not look for {}: {error}", path.display())))
}
