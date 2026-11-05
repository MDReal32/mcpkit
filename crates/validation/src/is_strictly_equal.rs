use serde_json::Value;

/// JavaScript's `===` on JSON values, with a missing value as `undefined`: objects and arrays are never equal.
pub fn is_strictly_equal(left: Option<&Value>, right: Option<&Value>) -> bool {
    match (left, right) {
        (None, None) => true,
        (Some(Value::Number(left)), Some(Value::Number(right))) => left.as_f64() == right.as_f64(),
        (Some(Value::Object(_) | Value::Array(_)), _) | (_, Some(Value::Object(_) | Value::Array(_))) => false,
        (Some(left), Some(right)) => left == right,
        _ => false,
    }
}
