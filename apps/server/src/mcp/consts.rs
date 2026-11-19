pub const DEFAULT_PROTOCOL_VERSION: &str = "2025-06-18";

/// The modern MCP versions (per-request `_meta`, no `initialize` handshake) this server speaks; `server/discover`
/// lists them, and a request naming any other one is answered with [`UNSUPPORTED_PROTOCOL_VERSION`].
pub const MODERN_PROTOCOL_VERSIONS: &[&str] = &["2026-07-28"];

/// The `_meta` key a modern request names its protocol version under.
pub const PROTOCOL_VERSION_META_KEY: &str = "io.modelcontextprotocol/protocolVersion";

/// The `_meta` key a modern result names the server under.
pub const SERVER_INFO_META_KEY: &str = "io.modelcontextprotocol/serverInfo";

pub const SERVER_NAME: &str = "usemcpkit";

/// The `resultType` of a finished `tools/call`, which the MCP `CallToolResult` (2026-07-28) requires.
pub const RESULT_TYPE_COMPLETE: &str = "complete";

pub const TOOL_ID_SEPARATOR: char = ':';

/// Between the segments of the path in an endpoint's tool name.
pub const PATH_SEPARATOR: char = '/';

pub const PARSE_ERROR: i64 = -32700;

pub const INVALID_REQUEST: i64 = -32600;

pub const METHOD_NOT_FOUND: i64 = -32601;

pub const INVALID_PARAMS: i64 = -32602;

pub const UNSUPPORTED_PROTOCOL_VERSION: i64 = -32022;
