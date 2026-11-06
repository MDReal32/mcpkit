/// Tells the client to list the tools again; the server sends it after opening a section, the runner after a reload.
pub const TOOLS_LIST_CHANGED: &str = r#"{"jsonrpc":"2.0","method":"notifications/tools/list_changed"}"#;

/// Set to `1` to list one section per server and load a server's tools only when the model opens it (beta); anything
/// else lists every tool from the start, for clients that never list again after `tools/list_changed`.
pub const PARTIAL_LOADING_ENV: &str = "USEMCPKIT_BETA_PARTIAL_LOADING";

pub const PARTIAL_LOADING_ENABLED: &str = "1";

pub const PARTIAL_LOADING_DISABLED: &str = "0";
