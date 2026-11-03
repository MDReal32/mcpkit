use indexmap::IndexMap;
use serde_json::{Map, Value};

/// The `values` of a checked token answer, each trimmed.
pub fn read_answer_values(response: &Map<String, Value>) -> IndexMap<String, String> {
    response
        .get("values")
        .and_then(Value::as_object)
        .into_iter()
        .flatten()
        .filter_map(|(key, value)| Some((key.clone(), value.as_str()?.trim().to_owned())))
        .collect()
}
