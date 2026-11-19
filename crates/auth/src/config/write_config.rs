use crate::AuthError;
use crate::config::sort_config::sort_config;
use crate::files::write_json_file;
use serde_json::{Map, Value};
use std::path::Path;

/// Writes the config with its keys in order, the way every save leaves it.
pub async fn write_config(file: &Path, config: Map<String, Value>) -> Result<(), AuthError> {
    write_json_file(file, &Value::Object(sort_config(config))).await
}
