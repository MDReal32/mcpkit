use std::time::Duration;

pub const MANIFESTS_DIR_NAME: &str = "manifests";

pub const FETCH_TIMEOUT: Duration = Duration::from_secs(30);

pub const REGISTRY_ENV: &str = "USEMCPKIT_REGISTRY";

/// Where CI publishes the compiled manifests; the same value as `DEFAULT_REGISTRY_URL` in `packages/servers`.
pub const DEFAULT_REGISTRY_URL: &str = "https://mdreal32.github.io/mcpkit";

/// The folder of the published registry that holds the manifests of this release: a binary reads only the manifests
/// published with its own version.
pub const REGISTRY_VERSION_DIR: &str = concat!("v", env!("CARGO_PKG_VERSION"));

pub const INDEX_FILE_NAME: &str = "index.json";

pub const CACHE_FILE_NAME: &str = "cache.json";

pub const TOOL_NAME_SEPARATOR: char = ':';
