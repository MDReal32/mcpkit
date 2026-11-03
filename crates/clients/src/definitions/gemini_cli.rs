use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;

pub const GEMINI_CLI: ClientDefinition = ClientDefinition {
    id: "gemini-cli",
    name: "Gemini CLI",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".gemini")],
    config_path: |context| context.home_dir.join(".gemini").join("settings.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
};
