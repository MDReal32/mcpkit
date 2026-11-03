use crate::AuthError;
use crate::files::{parse_json_file, read_text_if_exists};
use crate::secret_file::is_stored_secrets::is_stored_secrets;
use serde_json::{Map, Value};
use std::path::Path;

/// A missing file means nothing is saved; a malformed one fails instead of being overwritten.
pub async fn read_stored_secrets(file: &Path) -> Result<Map<String, Value>, AuthError> {
    let Some(text) = read_text_if_exists(file).await? else {
        return Ok(Map::new());
    };
    match parse_json_file(file, &text)? {
        Value::Object(secrets) if is_stored_secrets(&Value::Object(secrets.clone())) => Ok(secrets),
        _ => Err(AuthError(format!(
            "{} is not a valid mcpkit secrets file",
            file.display()
        ))),
    }
}
