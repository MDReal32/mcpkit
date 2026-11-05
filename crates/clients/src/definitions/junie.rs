use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;

pub const JUNIE: ClientDefinition = ClientDefinition {
    id: "junie",
    name: "JetBrains Junie",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".junie")],
    config_path: |context| context.home_dir.join(".junie").join("mcp").join("mcp.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
};
