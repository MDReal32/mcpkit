use serde_json::{Map, Value};

/// The object under `key`, added at the end when it is missing, like spreading `{ ...map[key], ... }` back into it;
/// a value that is not an object is replaced, so callers only pass data already validated as objects.
pub fn object_entry<'a>(map: &'a mut Map<String, Value>, key: &str) -> &'a mut Map<String, Value> {
    let entry = map.entry(key).or_insert_with(|| Value::Object(Map::new()));
    if !entry.is_object() {
        *entry = Value::Object(Map::new());
    }
    match entry {
        Value::Object(object) => object,
        _ => unreachable!("the entry was just made an object"),
    }
}
