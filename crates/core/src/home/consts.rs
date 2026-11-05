/// Moves everything usemcpkit keeps (config, manifests, repos, logs aside) to another folder.
pub const HOME_ENV: &str = "USEMCPKIT_HOME";

pub const HOME_DIR_NAME: &str = ".usemcpkit";

/// The home folder releases used before the brand became usemcpkit; its saved credentials are copied over once.
pub const LEGACY_HOME_DIR_NAME: &str = ".mcpkit";
