use serde::de::DeserializeOwned;
use serde_json::Value;
use std::io::ErrorKind;
use std::path::Path;

/// The JSON a cache file holds; `None` when there is no file or it has another shape, so it is built again. A file
/// that is not JSON is an error.
pub async fn read_json_file<T: DeserializeOwned>(file: &Path) -> Result<Option<T>, String> {
    let text = match tokio::fs::read_to_string(file).await {
        Ok(text) => text,
        Err(error) if error.kind() == ErrorKind::NotFound => return Ok(None),
        Err(error) => return Err(format!("cannot read {}: {error}", file.display())),
    };
    let body: Value =
        serde_json::from_str(&text).map_err(|error| format!("{} is not JSON: {error}", file.display()))?;
    Ok(serde_json::from_value(body).ok())
}
