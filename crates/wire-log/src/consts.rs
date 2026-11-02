/// `1` turns the wire log on: one JSON-lines file per serve process under ~/.mcpkit/logs, metadata only, no payloads.
pub const WIRE_LOG_ENV: &str = "USEMCPKIT_DEBUG";

pub const WIRE_LOG_ENABLED: &str = "1";

pub const WIRE_LOG_DIR_NAME: &str = "logs";

pub const MCPKIT_DIR_NAME: &str = ".mcpkit";
