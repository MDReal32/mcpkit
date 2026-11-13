use std::time::Duration;

pub const OPENAPI_CACHE_DIR_NAME: &str = "openapi";

/// `hosts.json` in a server's folder: per host, the source and version its tools were built for.
pub const HOSTS_FILE_NAME: &str = "hosts.json";

/// The `hosts.json` key of a server that has no domain.
pub const ANY_HOST_KEY: &str = "*";

/// How long the version a server answered is trusted before it is asked again.
pub const VERSION_CHECK_INTERVAL: Duration = Duration::from_secs(24 * 60 * 60);

pub const SPEC_FILE_EXTENSION: &str = "yaml";

pub const TOOLS_FILE_EXTENSION: &str = "json";

/// Between a source name and a version in the names of the cached files, as in `datacenter@10.3`.
pub const VERSION_SEPARATOR: char = '@';

pub const PROBE_TOOL_NAME: &str = "openapi:version:probe";

/// What a source without a version probe signs in against: the API's base url, which only a refused sign-in answers
/// with 401.
pub const SIGN_IN_PATH: &str = "/";
