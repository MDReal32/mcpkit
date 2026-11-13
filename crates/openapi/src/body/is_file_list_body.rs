use crate::OpenApiError;
use crate::body::selected_body::SelectedBody;
use crate::consts::MULTIPART_CONTENT_TYPE;
use crate::document::SpecDocument;
use serde_json::Value;

/// A multipart body that is bare files rather than named parts: a list of files, or one binary string as Jira Data
/// Center describes its attachment upload.
pub fn is_file_list_body(document: &SpecDocument, selected: &SelectedBody) -> Result<bool, OpenApiError> {
    if selected.content_type != MULTIPART_CONTENT_TYPE {
        return Ok(false);
    }
    let schema = document.resolve(selected.schema.node())?;
    let is_binary = schema.get("type").and_then(Value::as_str) == Some("string")
        && schema.get("format").and_then(Value::as_str) == Some("binary");
    Ok(is_binary || schema.get("type").and_then(Value::as_str) == Some("array"))
}
