use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_stdio_entry::create_stdio_entry;

pub const CURSOR: ClientDefinition = ClientDefinition {
    id: "cursor",
    name: "Cursor",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".cursor")],
    config_path: |context| context.home_dir.join(".cursor").join("mcp.json"),
    servers_path: &["mcpServers"],
    create_entry: create_stdio_entry,
    settings: &[],
};
