use crate::OpenApiError;
use crate::body::is_file_list_body::is_file_list_body;
use crate::body::select_body_content::select_body_content;
use crate::consts::MULTIPART_CONTENT_TYPE;
use crate::document::SpecDocument;
use crate::endpoints::Endpoint;
use crate::schema::{Conversion, convert_schema};
use serde_json::Value;

/// Why the endpoint's request body cannot be sent, if it cannot.
pub fn find_body_reason(
    document: &SpecDocument,
    endpoint: &Endpoint,
    conversion: &Conversion,
) -> Result<Option<String>, OpenApiError> {
    if endpoint.method == "get" {
        return Ok(None);
    }
    let Some(body) = endpoint.operation.get("requestBody") else {
        return Ok(None);
    };
    let Some(content) = document.resolve(body)?.get("content").and_then(Value::as_object) else {
        return Ok(None);
    };
    let Some(selected) = select_body_content(content) else {
        let types: Vec<&str> = content.keys().map(String::as_str).collect();
        return Ok(Some(format!(
            "request body is {}, only JSON, text, multipart and binary bodies are supported",
            types.join(", ")
        )));
    };
    if is_file_list_body(document, &selected)? {
        return Ok(conversion
            .file_part_name
            .is_none()
            .then(|| "request body is a multipart file list without a configured part name".to_owned()));
    }
    let schema = document.resolve(selected.schema.node())?;
    if selected.content_type == MULTIPART_CONTENT_TYPE && schema.get("properties").is_none() {
        return Ok(Some(
            "request body is multipart/form-data without named parts".to_owned(),
        ));
    }
    let converted = convert_schema(document, selected.schema.node(), conversion, 0, &mut Vec::new())?;
    let dotted = converted
        .get("properties")
        .and_then(Value::as_object)
        .and_then(|properties| properties.keys().find(|name| name.contains('.')).cloned());
    Ok(dotted.map(|name| {
        format!("request body property \"{name}\" contains a dot, which the executor reads as a nested path")
    }))
}
