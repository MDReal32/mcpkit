use crate::OpenApiError;
use crate::body::selected_body::SelectedBody;
use crate::consts::MULTIPART_CONTENT_TYPE;
use crate::document::SpecDocument;
use serde_json::Value;

/// A multipart body that is a bare list of files rather than named parts.
pub fn is_file_list_body(document: &SpecDocument, selected: &SelectedBody) -> Result<bool, OpenApiError> {
    if selected.content_type != MULTIPART_CONTENT_TYPE {
        return Ok(false);
    }
    let schema = document.resolve(selected.schema.node())?;
    Ok(schema.get("type").and_then(Value::as_str) == Some("array"))
}
