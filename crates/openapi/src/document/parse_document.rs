use crate::OpenApiError;
use crate::document::consts::MAX_YAML_NODES;
use crate::document::upgrade_swagger2::upgrade_swagger2;
use serde_json::Value;

/// A JSON or YAML document as OpenAPI 3: a Swagger 2.0 one is upgraded.
pub fn parse_document(text: &str) -> Result<Value, OpenApiError> {
    let parsed: Value = if text.trim_start().starts_with('{') {
        serde_json::from_str(text).map_err(|error| OpenApiError(format!("the document is not valid JSON: {error}")))?
    } else {
        let options = serde_saphyr::options! {
            budget: serde_saphyr::budget! {
                max_events: MAX_YAML_NODES * 2,
                max_nodes: MAX_YAML_NODES,
            },
        };
        serde_saphyr::from_str_with_options(text, options)
            .map_err(|error| OpenApiError(format!("the document is not valid YAML: {error}")))?
    };
    if !parsed.get("paths").is_some_and(Value::is_object) {
        return Err(OpenApiError("the document has no \"paths\" object".to_owned()));
    }
    if parsed.get("swagger").and_then(Value::as_str) == Some("2.0") {
        return Ok(upgrade_swagger2(&parsed));
    }
    Ok(parsed)
}
