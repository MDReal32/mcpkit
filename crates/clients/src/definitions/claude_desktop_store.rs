use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;
use crate::definitions::resolve_claude_desktop_store_dir::resolve_claude_desktop_store_dir;
use usemcpkit_core::platform::Platform;

pub const CLAUDE_DESKTOP_STORE: ClientDefinition = ClientDefinition {
    id: "claude-desktop-store",
    name: "Claude Desktop (Microsoft Store)",
    format: ConfigFormat::Json,
    detect_paths: |context| {
        if context.platform == Platform::Windows {
            vec![resolve_claude_desktop_store_dir(context)]
        } else {
            Vec::new()
        }
    },
    config_path: |context| resolve_claude_desktop_store_dir(context).join("claude_desktop_config.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
    settings: &[],
};
