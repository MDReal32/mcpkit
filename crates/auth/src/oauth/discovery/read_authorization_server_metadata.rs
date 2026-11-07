use crate::AuthError;
use crate::oauth::discovery::authorization_server_metadata::AuthorizationServerMetadata;
use crate::oauth::discovery::consts::PKCE_METHOD;
use serde_json::Value;

fn read_string(document: &Value, key: &str) -> Option<String> {
    document.get(key).and_then(Value::as_str).map(str::to_owned)
}

/// Reads the endpoints out of an authorization server document, refusing a server that cannot do PKCE with S256.
pub fn read_authorization_server_metadata(
    document: &Value,
    issuer: &str,
    server_name: &str,
) -> Result<AuthorizationServerMetadata, AuthError> {
    let (Some(authorization_endpoint), Some(token_endpoint)) = (
        read_string(document, "authorization_endpoint"),
        read_string(document, "token_endpoint"),
    ) else {
        return Err(AuthError(format!(
            "{server_name}: the authorization server {issuer} publishes no authorization or token endpoint"
        )));
    };
    let supports_pkce = document
        .get("code_challenge_methods_supported")
        .and_then(Value::as_array)
        .is_none_or(|methods| methods.iter().any(|method| method.as_str() == Some(PKCE_METHOD)));
    if !supports_pkce {
        return Err(AuthError(format!(
            "{server_name}: the authorization server {issuer} does not support PKCE with {PKCE_METHOD}"
        )));
    }
    Ok(AuthorizationServerMetadata {
        issuer: read_string(document, "issuer").unwrap_or_else(|| issuer.to_owned()),
        authorization_endpoint,
        token_endpoint,
        registration_endpoint: read_string(document, "registration_endpoint"),
    })
}
