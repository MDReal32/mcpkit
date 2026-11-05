use serde_json::Value;

pub fn is_string_record(value: Option<&Value>) -> bool {
    value
        .and_then(Value::as_object)
        .is_some_and(|object| object.values().all(Value::is_string))
}
