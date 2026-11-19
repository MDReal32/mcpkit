use serde_json::Value;

/// A JSON-RPC error a request is answered with instead of a result.
#[derive(Clone, Debug, PartialEq)]
pub struct RpcError {
    pub code: i64,
    pub message: String,
    pub data: Option<Value>,
}

impl RpcError {
    pub fn new(code: i64, message: impl Into<String>) -> Self {
        RpcError {
            code,
            message: message.into(),
            data: None,
        }
    }

    /// The error with a `data` member, such as the versions an unsupported protocol version error lists.
    pub fn with_data(mut self, data: Value) -> Self {
        self.data = Some(data);
        self
    }
}
