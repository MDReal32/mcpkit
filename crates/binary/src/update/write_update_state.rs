use crate::binary_error::BinaryError;
use crate::update::resolve_update_state_path::resolve_update_state_path;
use crate::update::update_state::UpdateState;
use mcpkit_core::js::to_js_json;
use serde_json::json;
use std::path::Path;

pub fn write_update_state(home_dir: &Path, state: UpdateState) -> Result<(), BinaryError> {
    let path = resolve_update_state_path(home_dir);
    let failed = |error: std::io::Error| BinaryError(format!("cannot write {}: {error}", path.display()));
    if let Some(parent) = path.parent() {
        std::fs::create_dir_all(parent).map_err(failed)?;
    }
    let text = format!("{}\n", to_js_json(&json!({ "checkedAt": state.checked_at })));
    std::fs::write(&path, text).map_err(failed)
}
