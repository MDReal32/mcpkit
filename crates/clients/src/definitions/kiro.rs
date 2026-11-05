use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_enabled_entry::create_enabled_entry;

pub const KIRO: ClientDefinition = ClientDefinition {
    id: "kiro",
    name: "Kiro",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".kiro")],
    config_path: |context| context.home_dir.join(".kiro").join("settings").join("mcp.json"),
    servers_path: &["mcpServers"],
    create_entry: create_enabled_entry,
};
