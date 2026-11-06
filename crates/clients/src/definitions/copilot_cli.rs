use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::launch_args::launch_args;
use crate::definitions::resolve_copilot_home::resolve_copilot_home;
use serde_json::{Map, Value};

/// Also VS Code's portable "Copilot Global" MCP config.
pub const COPILOT_CLI: ClientDefinition = ClientDefinition {
    id: "copilot-cli",
    name: "GitHub Copilot CLI",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![resolve_copilot_home(context)],
    config_path: |context| resolve_copilot_home(context).join("mcp-config.json"),
    servers_path: &["mcpServers"],
    create_entry: |launch| {
        Map::from_iter([
            ("type".to_owned(), Value::from("local")),
            ("command".to_owned(), Value::from(launch.command.clone())),
            ("args".to_owned(), launch_args(launch)),
            ("tools".to_owned(), Value::from(vec!["*"])),
        ])
    },
    settings: &[],
};
