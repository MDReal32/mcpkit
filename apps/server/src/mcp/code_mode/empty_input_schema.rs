use serde_json::{Map, Value, json};

/// The schema of an upstream tool that lists none: an object with no properties.
pub fn empty_input_schema() -> Map<String, Value> {
    let mut schema = Map::new();
    schema.insert("type".to_owned(), json!("object"));
    schema.insert("properties".to_owned(), json!({}));
    schema
}
