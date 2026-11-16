use crate::endpoints::Parameter;
use serde_json::Value;

/// Query parameters whose array goes out as one comma-separated value (`explode: false`).
pub fn collect_comma_query(parameters: &[&Parameter]) -> Vec<String> {
    parameters
        .iter()
        .filter(|parameter| {
            parameter.explode == Some(false)
                && parameter
                    .schema
                    .and_then(|schema| schema.get("type"))
                    .and_then(Value::as_str)
                    == Some("array")
        })
        .map(|parameter| parameter.name.clone())
        .collect()
}
