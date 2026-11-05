use serde_json::{Map, Value};

/// A local file read for an argument the request names in `fileArgs`.
#[derive(Clone, Debug, PartialEq, Eq)]
pub struct UploadedFile {
    pub name: String,
    pub data: Vec<u8>,
}

impl UploadedFile {
    /// What `JSON.stringify` makes of the TypeScript `{ name, data: Uint8Array }`: the bytes keyed by their index.
    pub fn to_json(&self) -> Value {
        let data: Map<String, Value> = self
            .data
            .iter()
            .enumerate()
            .map(|(index, byte)| (index.to_string(), Value::from(*byte)))
            .collect();
        let mut file = Map::new();
        file.insert("name".into(), Value::String(self.name.clone()));
        file.insert("data".into(), Value::Object(data));
        Value::Object(file)
    }
}
