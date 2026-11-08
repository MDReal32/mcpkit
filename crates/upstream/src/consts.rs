use std::time::Duration;

pub const MCP_PROTOCOL_VERSION: &str = "2025-06-18";

pub const CLIENT_NAME: &str = "usemcpkit";

pub const REQUEST_TIMEOUT: Duration = Duration::from_secs(60);

pub const SESSION_HEADER: &str = "mcp-session-id";

pub const PROTOCOL_HEADER: &str = "mcp-protocol-version";

/// The only variables of usemcpkit's own environment a child sees; credentials are handed over by name, never inherited.
pub const FORWARDED_ENV_NAMES: [&str; 7] = ["PATH", "HOME", "USERPROFILE", "SystemRoot", "TEMP", "TMPDIR", "LANG"];

pub const HTTP_UNAUTHORIZED: u16 = 401;

/// Streamable HTTP: the answer to a request whose session the server ended, after which the client starts a new one.
pub const HTTP_NOT_FOUND: u16 = 404;

/// The headers the HTTP transport sets itself; a manifest header of the same name, in any case, is replaced.
pub const TRANSPORT_HEADERS: [&str; 4] = ["accept", "content-type", PROTOCOL_HEADER, SESSION_HEADER];
