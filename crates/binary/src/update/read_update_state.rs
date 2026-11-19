use crate::binary_error::BinaryError;
use crate::update::resolve_update_state_path::resolve_update_state_path;
use crate::update::update_state::UpdateState;
use std::io::ErrorKind;
use std::path::Path;

/// A missing or unreadable state file means "never checked".
pub fn read_update_state(home_dir: &Path) -> Result<UpdateState, BinaryError> {
    let empty = UpdateState { checked_at: 0.0 };
    let path = resolve_update_state_path(home_dir);
    let text = match std::fs::read_to_string(&path) {
        Ok(text) => text,
        Err(error) if error.kind() == ErrorKind::NotFound => return Ok(empty),
        Err(error) => return Err(BinaryError(format!("cannot read {}: {error}", path.display()))),
    };
    Ok(text
        .trim()
        .parse::<f64>()
        .ok()
        .filter(|checked_at| checked_at.is_finite())
        .map_or(empty, |checked_at| UpdateState { checked_at }))
}
