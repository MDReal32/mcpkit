use crate::json::set_json_path::set_json_path;
use indexmap::IndexMap;
use serde_json::{Map, Value};

/// `{ "fields.summary": "x" }` becomes `{ "fields": { "summary": "x" } }`.
pub fn expand_json_paths(values: IndexMap<String, Value>) -> Value {
    values
        .into_iter()
        .fold(Value::Object(Map::new()), |body, (path, value)| {
            let segments: Vec<&str> = path.split('.').collect();
            set_json_path(Some(body), &segments, value)
        })
}
