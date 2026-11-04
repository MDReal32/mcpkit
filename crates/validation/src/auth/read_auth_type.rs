use serde_json::Value;

pub fn read_auth_type(entry: &Value) -> Option<&Value> {
    entry.as_object().and_then(|object| object.get("type"))
}
