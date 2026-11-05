use serde_json::{Map, Value};

/// `target` with `value` at `segments`; a segment of digits indexes an array. A missing target, or one of the other kind,
/// starts empty; array slots skipped over hold `null`, which is how `JSON.stringify` writes the holes.
pub fn set_json_path(target: Option<Value>, segments: &[&str], value: Value) -> Value {
    let Some((head, rest)) = segments.split_first() else {
        return value;
    };
    if !head.is_empty() && head.chars().all(|character| character.is_ascii_digit()) {
        let mut list = match target {
            Some(Value::Array(items)) => items,
            _ => Vec::new(),
        };
        let Some(length) = head.parse::<usize>().ok().and_then(|index| index.checked_add(1)) else {
            return Value::Array(list);
        };
        let index = length - 1;
        if list.len() < length {
            list.resize(length, Value::Null);
        }
        let current = std::mem::take(&mut list[index]);
        list[index] = set_json_path(Some(current), rest, value);
        return Value::Array(list);
    }
    let mut record = match target {
        Some(Value::Object(entries)) => entries,
        _ => Map::new(),
    };
    let current = record.get(*head).cloned();
    record.insert((*head).to_owned(), set_json_path(current, rest, value));
    Value::Object(record)
}

#[cfg(test)]
mod tests {
    use super::set_json_path;
    use serde_json::json;

    #[test]
    fn nests_objects_and_indexes_arrays() {
        let value = set_json_path(Some(json!({ "a": 1 })), &["b", "1", "c"], json!("x"));

        assert_eq!(value, json!({ "a": 1, "b": [null, { "c": "x" }] }));
    }
}
