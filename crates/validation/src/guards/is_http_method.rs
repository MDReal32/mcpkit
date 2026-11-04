use crate::guards::consts::HTTP_METHODS;
use serde_json::Value;

pub fn is_http_method(value: Option<&Value>) -> bool {
    value
        .and_then(Value::as_str)
        .is_some_and(|text| HTTP_METHODS.contains(&text))
}
