use crate::mapping::read_property::read_property;
use serde_json::Value;

/// Resolves `a.b.c` paths; a `name[]` segment maps the rest of the path over an array, where an item without the value
/// becomes `null` as `JSON.stringify` writes `undefined` in an array.
pub fn get_path(source: Option<&Value>, path: &str) -> Option<Value> {
    let (head, rest) = path.split_once('.').unwrap_or((path, ""));
    let Some(list_key) = head.strip_suffix("[]") else {
        let value = read_property(source, head);
        if rest.is_empty() {
            return value;
        }
        return get_path(value.as_ref(), rest);
    };
    let Some(Value::Array(items)) = read_property(source, list_key) else {
        return None;
    };
    if rest.is_empty() {
        return Some(Value::Array(items));
    }
    Some(Value::Array(
        items
            .iter()
            .map(|item| get_path(Some(item), rest).unwrap_or(Value::Null))
            .collect(),
    ))
}

#[cfg(test)]
mod tests {
    use super::get_path;
    use serde_json::json;

    #[test]
    fn reads_nested_paths_and_maps_over_arrays() {
        let data = json!({ "a": { "b": [{ "c": 1 }, { "d": 2 }] } });

        assert_eq!(get_path(Some(&data), "a.b[].c"), Some(json!([1, null])));
        assert_eq!(get_path(Some(&data), "a.b"), Some(json!([{ "c": 1 }, { "d": 2 }])));
        assert_eq!(get_path(Some(&data), "a.x.y"), None);
        assert_eq!(get_path(Some(&data), "a[]"), None);
    }
}
