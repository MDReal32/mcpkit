use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;

pub const LM_STUDIO: ClientDefinition = ClientDefinition {
    id: "lm-studio",
    name: "LM Studio",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".lmstudio")],
    config_path: |context| context.home_dir.join(".lmstudio").join("mcp.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
    settings: &[],
};
