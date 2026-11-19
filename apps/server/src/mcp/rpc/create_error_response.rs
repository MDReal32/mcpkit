use crate::mcp::rpc::rpc_error::RpcError;
use serde_json::{Value, json};

pub fn create_error_response(id: Value, error: &RpcError) -> Value {
    let mut body = json!({ "code": error.code, "message": error.message });
    if let Some(data) = &error.data {
        body["data"] = data.clone();
    }
    json!({ "jsonrpc": "2.0", "id": id, "error": body })
}
