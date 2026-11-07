use crate::oauth::discovery::authorization_server_metadata::AuthorizationServerMetadata;
use crate::oauth::discovery::consts::{
    AUTHORIZATION_SERVER_WELL_KNOWN, OPENID_CONFIGURATION_WELL_KNOWN, PROTECTED_RESOURCE_WELL_KNOWN,
};
use crate::oauth::discovery::fetch_json::fetch_json;
use crate::oauth::discovery::list_well_known_urls::list_well_known_urls;
use crate::oauth::discovery::read_authorization_server_metadata::read_authorization_server_metadata;
use crate::{AuthContext, AuthError};
use serde_json::Value;
use url::Url;

fn parse_url(text: &str, server_name: &str) -> Result<Url, AuthError> {
    Url::parse(text).map_err(|error| AuthError(format!("{server_name}: invalid discovery URL {text}: {error}")))
}

async fn find_issuer(resource: &Url, server_name: &str, context: &AuthContext) -> Result<Url, AuthError> {
    for url in list_well_known_urls(resource, PROTECTED_RESOURCE_WELL_KNOWN) {
        let Some(document) = fetch_json(&url, context).await else {
            continue;
        };
        let issuer = document
            .get("authorization_servers")
            .and_then(Value::as_array)
            .and_then(|servers| servers.first())
            .and_then(Value::as_str);
        if let Some(issuer) = issuer {
            return parse_url(issuer, server_name);
        }
    }
    parse_url(&resource.origin().ascii_serialization(), server_name)
}

/// Finds the authorization server of an MCP server: the issuer its protected resource metadata names (RFC 9728), or the
/// server's own origin when it publishes none, then that issuer's metadata (RFC 8414, or OpenID Connect discovery).
pub async fn discover_authorization_server(
    resource: &str,
    server_name: &str,
    context: &AuthContext,
) -> Result<AuthorizationServerMetadata, AuthError> {
    let issuer = find_issuer(&parse_url(resource, server_name)?, server_name, context).await?;
    let candidates = list_well_known_urls(&issuer, AUTHORIZATION_SERVER_WELL_KNOWN)
        .into_iter()
        .chain(list_well_known_urls(&issuer, OPENID_CONFIGURATION_WELL_KNOWN));
    for url in candidates {
        if let Some(document) = fetch_json(&url, context).await {
            return read_authorization_server_metadata(&document, issuer.as_str(), server_name);
        }
    }
    Err(AuthError(format!(
        "{server_name}: {issuer} publishes no authorization server metadata, so there is nothing to sign in to"
    )))
}
