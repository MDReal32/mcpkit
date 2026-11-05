use crate::AuthError;
use crate::files::{parse_json_file, read_text_if_exists};
use crate::token_store::is_stored_token::is_stored_token;
use serde_json::{Map, Value};
use std::path::Path;

/// A missing file means no sessions; a malformed one fails instead of being overwritten. The tokens stay JSON, so a
/// save keeps the other servers' entries exactly as they were.
pub async fn read_tokens(file: &Path) -> Result<Map<String, Value>, AuthError> {
    let Some(text) = read_text_if_exists(file).await? else {
        return Ok(Map::new());
    };
    match parse_json_file(file, &text)? {
        Value::Object(tokens) if tokens.values().all(is_stored_token) => Ok(tokens),
        _ => Err(AuthError(format!("{} is not a valid tokens file", file.display()))),
    }
}
