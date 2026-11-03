use crate::ToolError;
use crate::args::ArgValue;
use crate::request::read_uploaded_file::read_uploaded_file;
use serde_json::Value;

/// An argument holds one path or an array of paths.
pub async fn read_uploaded_files(arg_name: &str, value: &Value) -> Result<ArgValue, ToolError> {
    let Value::Array(paths) = value else {
        return Ok(ArgValue::File(read_uploaded_file(arg_name, value).await?));
    };
    let mut files = Vec::with_capacity(paths.len());
    for path in paths {
        files.push(read_uploaded_file(arg_name, path).await?);
    }
    Ok(ArgValue::Files(files))
}
