use crate::guards::is_js_string;
use serde_json::{Map, Value};

/// `extra` of a `query` entry: a list of `{ env, name }`, both strings.
pub fn validate_query_extra(object: &Map<String, Value>, location: &str) -> Vec<String> {
    let Some(extra) = object.get("extra") else {
        return Vec::new();
    };
    let Some(params) = extra.as_array() else {
        return vec![format!("{location}.extra must be an array")];
    };
    params
        .iter()
        .enumerate()
        .flat_map(|(position, param)| {
            ["env", "name"]
                .into_iter()
                .filter(move |key| !is_js_string(param.get(*key)))
                .map(move |key| format!("{location}.extra[{position}].{key} must be a string"))
        })
        .collect()
}
