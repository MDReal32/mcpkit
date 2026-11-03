use crate::js::consts::MAX_EXACT_INTEGER;
use serde_json::{Number, Value};

/// The value with every float that has no fraction turned into an integer, so serde writes `2` where JavaScript's
/// `JSON.stringify` writes `2` and not `2.0`.
pub fn to_js_numbers(value: Value) -> Value {
    match value {
        Value::Number(number) if number.is_f64() => match number.as_f64() {
            Some(float) if float.fract() == 0.0 && float.abs() <= MAX_EXACT_INTEGER => {
                Value::Number(Number::from(float as i64))
            }
            _ => Value::Number(number),
        },
        Value::Array(items) => Value::Array(items.into_iter().map(to_js_numbers).collect()),
        Value::Object(entries) => Value::Object(
            entries
                .into_iter()
                .map(|(key, entry)| (key, to_js_numbers(entry)))
                .collect(),
        ),
        other => other,
    }
}

#[cfg(test)]
mod tests {
    use super::to_js_numbers;
    use serde_json::json;

    #[test]
    fn writes_whole_floats_as_integers() {
        let value = to_js_numbers(json!({ "a": [2.0, 1.5, -0.0], "b": 3 }));

        assert_eq!(value.to_string(), r#"{"a":[2,1.5,0],"b":3}"#);
    }
}
