use crate::openapi::write_cache_file::write_cache_file;
use serde::Serialize;
use std::path::Path;

pub async fn write_json_file<T: Serialize>(file: &Path, value: &T) -> Result<(), String> {
    let text = serde_json::to_string_pretty(value).map_err(|error| error.to_string())?;
    write_cache_file(file, &format!("{text}\n")).await
}
