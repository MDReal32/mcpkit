use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::create_command_entry::create_command_entry;
use crate::definitions::resolve_codex_home::resolve_codex_home;

pub const CODEX: ClientDefinition = ClientDefinition {
    id: "codex",
    name: "OpenAI Codex",
    format: ConfigFormat::Toml,
    detect_paths: |context| vec![resolve_codex_home(context)],
    config_path: |context| resolve_codex_home(context).join("config.toml"),
    servers_path: &["mcp_servers"],
    create_entry: create_command_entry,
};
