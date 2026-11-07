use std::time::Duration;

pub const DISCOVERY_TIMEOUT: Duration = Duration::from_secs(15);

pub const PROTECTED_RESOURCE_WELL_KNOWN: &str = "/.well-known/oauth-protected-resource";

pub const AUTHORIZATION_SERVER_WELL_KNOWN: &str = "/.well-known/oauth-authorization-server";

pub const OPENID_CONFIGURATION_WELL_KNOWN: &str = "/.well-known/openid-configuration";

pub const CLIENT_NAME: &str = "usemcpkit";

pub const PKCE_METHOD: &str = "S256";

pub const CLIENTS_FILE_NAME: &str = "oauth-clients.json";
