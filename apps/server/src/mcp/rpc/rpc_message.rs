use serde_json::{Map, Value};

/// A message without an id is a notification and gets no response; an explicit `null` id is kept apart from a
/// missing one, so it is answered.
#[derive(Clone, Debug, PartialEq)]
pub struct RpcMessage {
    pub id: Option<Value>,
    pub method: String,
    pub params: Option<Map<String, Value>>,
}
