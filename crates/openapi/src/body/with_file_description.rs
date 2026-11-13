use crate::consts::FILE_ARGUMENT_DESCRIPTION;
use serde_json::{Map, Value, json};

/// An argument schema that holds the path of a local file to upload.
pub fn with_file_description(mut property: Map<String, Value>) -> Value {
    property.insert("description".to_owned(), json!(FILE_ARGUMENT_DESCRIPTION));
    Value::Object(property)
}
