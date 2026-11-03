use serde_json::Value;

pub fn read_property(source: Option<&Value>, key: &str) -> Option<Value> {
    source?.as_object()?.get(key).cloned()
}
