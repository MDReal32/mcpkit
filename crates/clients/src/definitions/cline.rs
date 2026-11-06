use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_enabled_entry::create_enabled_entry;
use std::path::PathBuf;

/// One file shared by the Cline VS Code extension, CLI and JetBrains plugin.
pub const CLINE: ClientDefinition = ClientDefinition {
    id: "cline",
    name: "Cline",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".cline")],
    config_path: |context| {
        context
            .env
            .get("CLINE_MCP_SETTINGS_PATH")
            .map(PathBuf::from)
            .unwrap_or_else(|| {
                context
                    .home_dir
                    .join(".cline")
                    .join("data")
                    .join("settings")
                    .join("cline_mcp_settings.json")
            })
    },
    servers_path: &["mcpServers"],
    create_entry: create_enabled_entry,
    settings: &[],
};
