use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_enabled_entry::create_enabled_entry;
use crate::definitions::resolve_roo_storage_dir::resolve_roo_storage_dir;

pub const ROO_CODE: ClientDefinition = ClientDefinition {
    id: "roo-code",
    name: "Roo Code (VS Code)",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![resolve_roo_storage_dir(context)],
    config_path: |context| {
        resolve_roo_storage_dir(context)
            .join("settings")
            .join("mcp_settings.json")
    },
    servers_path: &["mcpServers"],
    create_entry: create_enabled_entry,
    settings: &[],
};
