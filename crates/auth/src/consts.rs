pub const CONFIG_FILE_NAME: &str = "config.json";

/// The file OAuth tokens were kept in before they moved into the config.
pub const LEGACY_TOKENS_FILE_NAME: &str = "tokens.json";

/// The file OAuth client registrations were kept in before they moved into the config.
pub const LEGACY_CLIENTS_FILE_NAME: &str = "oauth-clients.json";

/// The host key of a server that has no domain, so its credentials still live under `hosts`.
pub const DEFAULT_HOST_KEY: &str = "default";

/// The category a token of the old tokens file is filed under when no server of that name is in the config.
pub const UNKNOWN_CATEGORY: &str = "other";

/// The top-level keys of the config, in the order they are written; any other key follows in alphabetical order.
pub const CONFIG_KEY_ORDER: [&str; 3] = ["version", "servers", "oauthClients"];

pub const SERVERS_KEY: &str = "servers";

pub const OAUTH_CLIENTS_KEY: &str = "oauthClients";

/// The key of a server's OAuth sign-in: its token and when it was saved.
pub const SIGN_IN_KEY: &str = "signIn";

/// When a host's credentials or a sign-in were last saved, as a UTC time.
pub const SAVED_AT_KEY: &str = "savedAt";

#[cfg(unix)]
pub const PRIVATE_DIR_MODE: u32 = 0o700;

#[cfg(unix)]
pub const PRIVATE_FILE_MODE: u32 = 0o600;
