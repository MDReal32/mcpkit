pub const CONFIG_FILE_NAME: &str = "config.json";

/// The file credentials were kept in before they moved into the config.
pub const SECRETS_FILE_NAME: &str = "secrets.json";

pub const TOKENS_FILE_NAME: &str = "tokens.json";

/// Every file credentials are or were saved in, which a new home folder adopts from the old one.
pub const SAVED_FILE_NAMES: [&str; 3] = [CONFIG_FILE_NAME, SECRETS_FILE_NAME, TOKENS_FILE_NAME];

/// The host key of a server that has no domain, so its credentials still live under `hosts`.
pub const DEFAULT_HOST_KEY: &str = "default";

/// The category of the servers that existed before the config grouped them by category.
pub const LEGACY_SERVER_CATEGORIES: &[(&str, &str)] = &[
    ("confluence", "atlassian"),
    ("jira", "atlassian"),
    ("github", "git"),
    ("gitlab", "git"),
];

pub const UNKNOWN_CATEGORY: &str = "other";

#[cfg(unix)]
pub const PRIVATE_DIR_MODE: u32 = 0o700;

#[cfg(unix)]
pub const PRIVATE_FILE_MODE: u32 = 0o600;
