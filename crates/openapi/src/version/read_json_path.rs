use serde_json::Value;

/// The value at a dotted path such as `data.version`; the value itself for an empty path.
pub fn read_json_path<'a>(value: &'a Value, path: &str) -> Option<&'a Value> {
    if path.is_empty() {
        return Some(value);
    }
    path.split('.').try_fold(value, |current, key| match current {
        Value::Array(items) => items.get(key.parse::<usize>().ok()?),
        _ => current.get(key),
    })
}
