use serde_json::Value;

/// A file: `format: binary`, or `contentEncoding: binary` as OpenAPI 3.1 writes it.
pub fn is_binary_schema(schema: Option<&Value>) -> bool {
    schema.is_some_and(|schema| {
        schema.get("format").and_then(Value::as_str) == Some("binary")
            || schema.get("contentEncoding").and_then(Value::as_str) == Some("binary")
    })
}
