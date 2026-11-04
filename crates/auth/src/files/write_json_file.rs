use crate::AuthError;
use crate::files::write_private_text_file::write_private_text_file;
use serde_json::Value;
use std::path::Path;
use usemcpkit_core::js::to_js_json_pretty;

/// Writes `JSON.stringify(value, null, 2)` as a private file, the way `write_private_text_file` does.
pub async fn write_json_file(file: &Path, value: &Value) -> Result<(), AuthError> {
    write_private_text_file(file, &format!("{}\n", to_js_json_pretty(value))).await
}
