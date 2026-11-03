use crate::ToolError;
use crate::args::UploadedFile;
use serde_json::Value;
use std::path::Path;

pub async fn read_uploaded_file(arg_name: &str, path: &Value) -> Result<UploadedFile, ToolError> {
    let Value::String(path) = path else {
        return Err(ToolError(format!(
            "Argument \"{arg_name}\" must be the path of a local file"
        )));
    };
    let data = tokio::fs::read(path)
        .await
        .map_err(|error| ToolError(format!("Cannot read the file for \"{arg_name}\": {error}")))?;
    let name = Path::new(path)
        .file_name()
        .map(|name| name.to_string_lossy().into_owned())
        .unwrap_or_default();
    Ok(UploadedFile { name, data })
}
