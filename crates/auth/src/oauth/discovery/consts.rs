use std::time::Duration;

pub const DISCOVERY_TIMEOUT: Duration = Duration::from_secs(15);

pub const PROTECTED_RESOURCE_WELL_KNOWN: &str = "/.well-known/oauth-protected-resource";

pub const AUTHORIZATION_SERVER_WELL_KNOWN: &str = "/.well-known/oauth-authorization-server";

pub const OPENID_CONFIGURATION_WELL_KNOWN: &str = "/.well-known/openid-configuration";

pub const CLIENT_NAME: &str = "usemcpkit";

pub const PKCE_METHOD: &str = "S256";

/// The client id of usemcpkit for an authorization server that takes the url of a client metadata document instead of
/// registering clients. It is the url `client-metadata/oauth-client.json` is published at, and the document names it as
/// its own `client_id`.
pub const CLIENT_METADATA_URL: &str = "https://mdreal32.github.io/mcpkit/oauth-client.json";
