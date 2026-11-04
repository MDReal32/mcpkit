pub const UI_ACTION_TYPES: &[&str] = &["link", "cli"];

pub const UI_URL_PLACEHOLDERS: &[&str] = &["domain", "webHost", "server"];

pub const UI_INPUT_KEYS: &[&str] = &["label", "hint", "placeholder"];

/// The auth types whose form a manifest may change with `ui`.
pub const UI_AUTH_TYPES: &[&str] = &["bearer", "header", "query", "basic"];

pub const UI_SERVER_KEYS: &[&str] = &["texts"];

pub const UI_AUTH_KEYS: &[&str] = &["inputs", "actions"];

/// The keys of an auth entry that name the env vars its form asks for.
pub const AUTH_ENV_KEYS: &[&str] = &["env", "usernameEnv", "passwordEnv"];
