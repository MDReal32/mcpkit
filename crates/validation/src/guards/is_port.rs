use crate::guards::consts::MAX_PORT;
use serde_json::Value;

/// An integer from 0 to 65535, like `Number.isInteger`, so `8080.0` counts.
pub fn is_port(value: Option<&Value>) -> bool {
    value
        .and_then(Value::as_f64)
        .is_some_and(|number| number.fract() == 0.0 && (0.0..=MAX_PORT).contains(&number))
}
