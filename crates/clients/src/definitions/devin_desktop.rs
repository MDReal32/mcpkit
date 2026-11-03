use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;
use crate::definitions::resolve_devin_dir::resolve_devin_dir;

/// Windsurf was renamed Devin Desktop and moved its MCP config; the old location is `WINDSURF`.
pub const DEVIN_DESKTOP: ClientDefinition = ClientDefinition {
    id: "devin-desktop",
    name: "Devin Desktop (Windsurf)",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![resolve_devin_dir(context)],
    config_path: |context| resolve_devin_dir(context).join("mcp_config.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
};
