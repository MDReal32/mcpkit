use crate::binary_error::BinaryError;
use crate::binary_set::BinarySet;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::sibling_window_path::sibling_window_path;
use crate::platform::Target;
use std::path::Path;

/// A runner on disk with the server and the credentials window next to it, which it cannot do without.
pub fn read_local_binaries(runner_path: &Path, target: Target) -> Result<BinarySet, BinaryError> {
    let server_path = sibling_server_path(runner_path, target);
    let window_path = sibling_window_path(runner_path, target);
    let read = |path: &Path| {
        std::fs::read(path).map_err(|error| BinaryError(format!("cannot read {}: {error}", path.display())))
    };
    for sibling in [&server_path, &window_path] {
        if !sibling.is_file() {
            return Err(BinaryError(format!(
                "{} has no {} next to it; build all three binaries into one folder",
                runner_path.display(),
                sibling.display()
            )));
        }
    }
    Ok(BinarySet {
        runner: read(runner_path)?,
        server: read(&server_path)?,
        window: read(&window_path)?,
    })
}
