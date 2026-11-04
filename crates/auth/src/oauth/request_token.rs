use crate::oauth::consts::{TOKEN_REQUEST_CONTENT_TYPE, TOKEN_REQUEST_TIMEOUT};
use crate::oauth::now_epoch_ms::now_epoch_ms;
use crate::oauth::parse_token_response::parse_token_response;
use crate::oauth::read_json_body::read_json_body;
use crate::resolve::{encode_basic_credentials, read_secret};
use crate::token_store::StoredToken;
use crate::{AuthContext, AuthError};
use indexmap::IndexMap;
use url::form_urlencoded;
use usemcpkit_http::{HttpRequest, RequestBody};
use usemcpkit_manifest::auth::{ClientAuthentication, OAuthAuth};
use usemcpkit_manifest::tool::HttpMethod;

/// Posts a grant to the entry's token endpoint, with the client credentials where the entry says they go.
pub async fn request_token(
    auth: &OAuthAuth,
    grant: &[(&str, &str)],
    server_name: &str,
    context: &AuthContext,
) -> Result<StoredToken, AuthError> {
    let secret = match &auth.client_secret_env {
        Some(env_name) => Some(read_secret(&context.env, env_name, server_name)?),
        None => None,
    };
    let mut headers = IndexMap::from([
        ("Accept".to_owned(), "application/json".to_owned()),
        ("Content-Type".to_owned(), TOKEN_REQUEST_CONTENT_TYPE.to_owned()),
    ]);
    headers.extend(
        auth.token_headers
            .iter()
            .flatten()
            .map(|(name, value)| (name.clone(), value.clone())),
    );
    let mut body = form_urlencoded::Serializer::new(String::new());
    body.extend_pairs(grant);
    if auth.client_authentication == Some(ClientAuthentication::Basic) {
        let credentials = encode_basic_credentials(&auth.client_id, secret.as_deref().unwrap_or_default());
        headers.insert("Authorization".to_owned(), credentials);
    } else {
        body.append_pair("client_id", &auth.client_id);
        if let Some(secret) = &secret {
            body.append_pair("client_secret", secret);
        }
    }
    let request = HttpRequest {
        url: auth.token_url.clone(),
        method: HttpMethod::Post,
        headers,
        body: Some(RequestBody::Text(body.finish())),
    };
    let response = context
        .http
        .send(&request, TOKEN_REQUEST_TIMEOUT)
        .await
        .map_err(|error| AuthError(error.0))?;
    let token_body = read_json_body(&response, server_name)?;
    parse_token_response(&token_body, response.status, server_name, now_epoch_ms())
}
