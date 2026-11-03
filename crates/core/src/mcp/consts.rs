/// Tells the client to list the tools again; the server sends it after opening a section, the runner after a reload.
pub const TOOLS_LIST_CHANGED: &str = r#"{"jsonrpc":"2.0","method":"notifications/tools/list_changed"}"#;
