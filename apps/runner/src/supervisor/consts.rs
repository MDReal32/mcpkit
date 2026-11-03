use std::time::Duration;

pub const BINARY_POLL_INTERVAL: Duration = Duration::from_millis(3000);

pub const HANDSHAKE_TIMEOUT: Duration = Duration::from_millis(15_000);

pub const RETIRED_WORKER_GRACE: Duration = Duration::from_secs(5 * 60);

/// How long the worker gets to wind down after the client went away, before it is killed.
pub const SHUTDOWN_GRACE: Duration = Duration::from_millis(3000);

pub const HANDSHAKE_REQUEST_ID: &str = "mcpkit-reload";

pub const INITIALIZE_METHOD: &str = "initialize";

pub const INITIALIZED_METHOD: &str = "notifications/initialized";

pub const SYNTHETIC_INITIALIZE: &str = r#"{"jsonrpc":"2.0","id":"mcpkit-reload","method":"initialize","params":{"protocolVersion":"2025-06-18","capabilities":{},"clientInfo":{"name":"mcpkit-supervisor","version":"0"}}}"#;
