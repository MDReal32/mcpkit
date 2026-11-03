use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;

pub const WARP: ClientDefinition = ClientDefinition {
    id: "warp",
    name: "Warp",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".warp")],
    config_path: |context| context.home_dir.join(".warp").join(".mcp.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
};
