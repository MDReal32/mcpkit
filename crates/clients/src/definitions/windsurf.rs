use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;

pub const WINDSURF: ClientDefinition = ClientDefinition {
    id: "windsurf",
    name: "Windsurf (legacy config)",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".codeium").join("windsurf")],
    config_path: |context| {
        context
            .home_dir
            .join(".codeium")
            .join("windsurf")
            .join("mcp_config.json")
    },
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
};
