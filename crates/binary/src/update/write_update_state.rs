use crate::binary_error::BinaryError;
use crate::update::resolve_update_state_path::resolve_update_state_path;
use crate::update::update_state::UpdateState;
use std::path::Path;

/// The file holds the time of the last check alone, in whole milliseconds since the epoch.
pub fn write_update_state(home_dir: &Path, state: UpdateState) -> Result<(), BinaryError> {
    let path = resolve_update_state_path(home_dir);
    let failed = |error: std::io::Error| BinaryError(format!("cannot write {}: {error}", path.display()));
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(failed)?;
    }
    std::fs::write(&path, format!("{}\n", state.checked_at as u64)).map_err(failed)
}
