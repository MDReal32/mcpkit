use serde_json::{Map, Value, json};

/// `{ jsonrpc, id, method, params }` in that order, without `id` for a notification and without absent `params`.
pub fn create_json_rpc_message(id: Option<u64>, method: &str, params: Option<Value>) -> Value {
    let mut message = Map::new();
    message.insert("jsonrpc".to_owned(), json!("2.0"));
    if let Some(id) = id {
        message.insert("id".to_owned(), json!(id));
    }
    message.insert("method".to_owned(), json!(method));
    if let Some(params) = params {
        message.insert("params".to_owned(), params);
    }
    Value::Object(message)
}
