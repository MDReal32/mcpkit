use crate::js::format_js_number::format_js_number;
use serde_json::Value;

/// What JavaScript's `String(value)` gives: a missing value is `undefined`, an object `[object Object]`, an array its
/// items joined by commas with `null` left empty, and a number as JavaScript prints it.
pub fn to_js_string(value: Option<&Value>) -> String {
    match value {
        None => "undefined".to_owned(),
        Some(Value::Null) => "null".to_owned(),
        Some(Value::String(text)) => text.clone(),
        Some(Value::Bool(flag)) => flag.to_string(),
        Some(Value::Number(number)) => format_js_number(number),
        Some(Value::Object(_)) => "[object Object]".to_owned(),
        Some(Value::Array(items)) => items
            .iter()
            .map(|item| match item {
                Value::Null => String::new(),
                item => to_js_string(Some(item)),
            })
            .collect::<Vec<_>>()
            .join(","),
    }
}

#[cfg(test)]
mod tests {
    use super::to_js_string;
    use serde_json::json;

    #[test]
    fn writes_values_as_javascript_does() {
        assert_eq!(to_js_string(None), "undefined");
        assert_eq!(to_js_string(Some(&json!("git_github"))), "git_github");
        assert_eq!(to_js_string(Some(&json!(7))), "7");
        assert_eq!(to_js_string(Some(&json!(2.0))), "2");
        assert_eq!(to_js_string(Some(&json!({ "a": 1 }))), "[object Object]");
        assert_eq!(to_js_string(Some(&json!(["a", null, 2]))), "a,,2");
    }
}
