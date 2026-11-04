use crate::binary_error::BinaryError;
use crate::binary_pair::BinaryPair;
use crate::install::sibling_server_path::sibling_server_path;
use crate::platform::Target;
use std::path::Path;

/// A runner on disk and the server next to it, which a runner cannot do without.
pub fn read_local_binaries(runner_path: &Path, target: Target) -> Result<BinaryPair, BinaryError> {
    let server_path = sibling_server_path(runner_path, target);
    let read = |path: &Path| {
        std::fs::read(path).map_err(|error| BinaryError(format!("cannot read {}: {error}", path.display())))
    };
    if !server_path.is_file() {
        return Err(BinaryError(format!(
            "{} has no {} next to it; build both binaries into one folder",
            runner_path.display(),
            server_path.display()
        )));
    }
    Ok(BinaryPair {
        runner: read(runner_path)?,
        server: read(&server_path)?,
    })
}
