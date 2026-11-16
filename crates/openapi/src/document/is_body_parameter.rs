use serde_json::Value;

/// A Swagger 2.0 parameter that is part of the request body.
pub fn is_body_parameter(parameter: &Value) -> bool {
    matches!(parameter.get("in").and_then(Value::as_str), Some("body" | "formData"))
}
