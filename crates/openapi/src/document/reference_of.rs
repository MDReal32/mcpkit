use serde_json::Value;

/// The `$ref` of a node, when it is a reference.
pub fn reference_of(node: &Value) -> Option<&str> {
    node.get("$ref").and_then(Value::as_str)
}
