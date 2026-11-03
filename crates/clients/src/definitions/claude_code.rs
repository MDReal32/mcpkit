use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_stdio_entry::create_stdio_entry;

pub const CLAUDE_CODE: ClientDefinition = ClientDefinition {
    id: "claude-code",
    name: "Claude Code",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.home_dir.join(".claude"), context.home_dir.join(".claude.json")],
    config_path: |context| context.home_dir.join(".claude.json"),
    servers_path: &["mcpServers"],
    create_entry: create_stdio_entry,
};
