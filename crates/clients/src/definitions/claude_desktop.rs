use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;
use usemcpkit_core::platform::Platform;

/// On Windows the folder alone is no sign of this build: the Store build leaves `%APPDATA%\Claude` behind with only a
/// marker file in it, so the app's own `config.json` is looked for instead.
pub const CLAUDE_DESKTOP: ClientDefinition = ClientDefinition {
    id: "claude-desktop",
    name: "Claude Desktop",
    format: ConfigFormat::Json,
    detect_paths: |context| {
        let app_dir = context.app_data_dir.join("Claude");
        if context.platform == Platform::Windows {
            vec![app_dir.join("config.json")]
        } else {
            vec![app_dir]
        }
    },
    config_path: |context| context.app_data_dir.join("Claude").join("claude_desktop_config.json"),
    servers_path: &["mcpServers"],
    create_entry: create_command_entry,
    settings: &[],
};
