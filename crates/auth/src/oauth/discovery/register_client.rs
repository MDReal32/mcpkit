use crate::oauth::discovery::client_registration::ClientRegistration;
use crate::oauth::discovery::consts::{CLIENT_NAME, DISCOVERY_TIMEOUT};
use crate::{AuthContext, AuthError};
use indexmap::IndexMap;
use serde_json::{Value, json};
use usemcpkit_http::{HttpRequest, RequestBody};
use usemcpkit_manifest::tool::HttpMethod;

/// Registers usemcpkit as a public client of the authorization server (RFC 7591) for one loopback redirect.
pub async fn register_client(
    registration_endpoint: &str,
    redirect_uri: &str,
    server_name: &str,
    context: &AuthContext,
) -> Result<ClientRegistration, AuthError> {
    let body = json!({
        "client_name": CLIENT_NAME,
        "redirect_uris": [redirect_uri],
        "grant_types": ["authorization_code", "refresh_token"],
        "response_types": ["code"],
        "token_endpoint_auth_method": "none",
    });
    let request = HttpRequest {
        url: registration_endpoint.to_owned(),
        method: HttpMethod::Post,
        headers: IndexMap::from([
            ("Accept".to_owned(), "application/json".to_owned()),
            ("Content-Type".to_owned(), "application/json".to_owned()),
        ]),
        body: Some(RequestBody::Text(body.to_string())),
    };
    let response = context.http.send(&request, DISCOVERY_TIMEOUT).await.map_err(|error| {
        AuthError(format!(
            "{server_name}: registering with {registration_endpoint} failed: {error}"
        ))
    })?;
    let document: Value = serde_json::from_str(&response.text()).unwrap_or(Value::Null);
    let client_id = document.get("client_id").and_then(Value::as_str);
    match (response.is_ok(), client_id) {
        (true, Some(client_id)) => Ok(ClientRegistration {
            client_id: client_id.to_owned(),
            redirect_uri: redirect_uri.to_owned(),
        }),
        _ => Err(AuthError(format!(
            "{server_name}: registering with {registration_endpoint} answered {} without a client id",
            response.status
        ))),
    }
}
