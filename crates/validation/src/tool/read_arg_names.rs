use crate::guards::{is_string_list, is_string_record};
use serde_json::Value;

/// The arg names of a `query` or `body` spec: a list of names, or an object whose values are the names.
pub fn read_arg_names(spec: &Value) -> Option<Vec<&str>> {
    if is_string_list(Some(spec)) {
        return spec
            .as_array()
            .map(|names| names.iter().filter_map(Value::as_str).collect());
    }
    if is_string_record(Some(spec)) {
        return spec
            .as_object()
            .map(|names| names.values().filter_map(Value::as_str).collect());
    }
    None
}
