use crate::mcp::rpc::rpc_error::RpcError;
use serde_json::{Value, json};

pub fn create_error_response(id: Value, error: &RpcError) -> Value {
    json!({
        "jsonrpc": "2.0",
        "id": id,
        "error": { "code": error.code, "message": error.message },
    })
}
