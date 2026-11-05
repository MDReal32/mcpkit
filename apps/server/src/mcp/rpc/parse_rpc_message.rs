use crate::mcp::consts::{INVALID_REQUEST, PARSE_ERROR};
use crate::mcp::rpc::is_rpc_id::is_rpc_id;
use crate::mcp::rpc::rpc_error::RpcError;
use crate::mcp::rpc::rpc_message::RpcMessage;
use serde_json::Value;

const NOT_A_REQUEST: &str = "invalid request: expected an object with a string \"method\"";

/// Validates one untrusted stdio line; the error is what the line is answered with.
pub fn parse_rpc_message(line: &str) -> Result<RpcMessage, RpcError> {
    let data: Value =
        serde_json::from_str(line).map_err(|error| RpcError::new(PARSE_ERROR, format!("parse error: {error}")))?;
    let Value::Object(mut data) = data else {
        return Err(RpcError::new(INVALID_REQUEST, NOT_A_REQUEST));
    };
    let Some(Value::String(method)) = data.remove("method") else {
        return Err(RpcError::new(INVALID_REQUEST, NOT_A_REQUEST));
    };
    let id = data.remove("id");
    if id.as_ref().is_some_and(|id| !is_rpc_id(id)) {
        return Err(RpcError::new(
            INVALID_REQUEST,
            "invalid request: \"id\" must be a string, number or null",
        ));
    }
    let params = match data.remove("params") {
        None => None,
        Some(Value::Object(params)) => Some(params),
        Some(_) => {
            return Err(RpcError::new(
                INVALID_REQUEST,
                "invalid request: \"params\" must be an object",
            ));
        }
    };
    Ok(RpcMessage { id, method, params })
}

#[cfg(test)]
mod tests {
    use super::parse_rpc_message;
    use serde_json::json;

    #[test]
    fn keeps_a_null_id_apart_from_a_missing_one() {
        assert_eq!(
            parse_rpc_message(r#"{"id":null,"method":"ping"}"#).unwrap().id,
            Some(json!(null))
        );
        assert_eq!(parse_rpc_message(r#"{"method":"ping"}"#).unwrap().id, None);
    }

    #[test]
    fn refuses_what_is_not_a_request() {
        assert_eq!(parse_rpc_message("[]").unwrap_err().code, -32600);
        assert_eq!(parse_rpc_message(r#"{"method":1}"#).unwrap_err().code, -32600);
        assert_eq!(
            parse_rpc_message(r#"{"id":{},"method":"ping"}"#).unwrap_err().message,
            "invalid request: \"id\" must be a string, number or null"
        );
        assert_eq!(
            parse_rpc_message(r#"{"method":"ping","params":[]}"#)
                .unwrap_err()
                .message,
            "invalid request: \"params\" must be an object"
        );
        assert_eq!(parse_rpc_message("{").unwrap_err().code, -32700);
    }
}
