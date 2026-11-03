use crate::AuthError;
use serde_json::Value;
use std::path::Path;

pub fn parse_json_file(file: &Path, text: &str) -> Result<Value, AuthError> {
    serde_json::from_str(text).map_err(|error| AuthError(format!("{} {error}", file.display())))
}
