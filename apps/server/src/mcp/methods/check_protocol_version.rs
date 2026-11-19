use crate::mcp::consts::{MODERN_PROTOCOL_VERSIONS, PROTOCOL_VERSION_META_KEY, UNSUPPORTED_PROTOCOL_VERSION};
use crate::mcp::rpc::RpcError;
use serde_json::{Map, Value, json};

/// Refuses a modern request whose `_meta` names a protocol version this server does not speak, listing the ones it
/// does. A request without that key is a legacy one, served after `initialize` as before.
pub fn check_protocol_version(params: Option<&Map<String, Value>>) -> Result<(), RpcError> {
    let requested = params
        .and_then(|params| params.get("_meta"))
        .and_then(|meta| meta.get(PROTOCOL_VERSION_META_KEY));
    let Some(requested) = requested else {
        return Ok(());
    };
    if requested
        .as_str()
        .is_some_and(|version| MODERN_PROTOCOL_VERSIONS.contains(&version))
    {
        return Ok(());
    }
    Err(
        RpcError::new(UNSUPPORTED_PROTOCOL_VERSION, "Unsupported protocol version")
            .with_data(json!({ "supported": MODERN_PROTOCOL_VERSIONS, "requested": requested })),
    )
}

#[cfg(test)]
mod tests {
    use super::check_protocol_version;
    use serde_json::{Map, Value, json};

    fn params(value: Value) -> Map<String, Value> {
        value.as_object().unwrap().clone()
    }

    #[test]
    fn accepts_a_legacy_request_and_a_supported_modern_one() {
        assert!(check_protocol_version(None).is_ok());
        assert!(check_protocol_version(Some(&params(json!({ "name": "search" })))).is_ok());
        let modern = params(json!({ "_meta": { "io.modelcontextprotocol/protocolVersion": "2026-07-28" } }));
        assert!(check_protocol_version(Some(&modern)).is_ok());
    }

    #[test]
    fn refuses_an_unknown_version_with_the_supported_ones() {
        let old = params(json!({ "_meta": { "io.modelcontextprotocol/protocolVersion": "1900-01-01" } }));
        let error = check_protocol_version(Some(&old)).unwrap_err();
        assert_eq!(error.code, -32022);
        assert_eq!(
            error.data,
            Some(json!({ "supported": ["2026-07-28"], "requested": "1900-01-01" }))
        );
    }
}
