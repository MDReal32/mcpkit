use crate::OpenApiError;
use serde_json::Value;

pub fn to_yaml(document: &Value) -> Result<String, OpenApiError> {
    serde_saphyr::to_string(document)
        .map_err(|error| OpenApiError(format!("cannot write the document as YAML: {error}")))
}
