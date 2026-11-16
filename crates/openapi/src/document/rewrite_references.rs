use crate::document::consts::SWAGGER2_REFERENCE_PREFIXES;
use serde_json::Value;

/// `value` with every Swagger 2.0 `$ref` moved to where OpenAPI 3 keeps the same thing.
pub fn rewrite_references(value: &Value) -> Value {
    match value {
        Value::Array(items) => Value::Array(items.iter().map(rewrite_references).collect()),
        Value::Object(fields) => Value::Object(
            fields
                .iter()
                .map(|(key, field)| {
                    let rewritten = match (key.as_str(), field) {
                        ("$ref", Value::String(reference)) => Value::String(
                            SWAGGER2_REFERENCE_PREFIXES
                                .iter()
                                .find_map(|(old, new)| reference.strip_prefix(old).map(|rest| format!("{new}{rest}")))
                                .unwrap_or_else(|| reference.clone()),
                        ),
                        _ => rewrite_references(field),
                    };
                    (key.clone(), rewritten)
                })
                .collect(),
        ),
        other => other.clone(),
    }
}
