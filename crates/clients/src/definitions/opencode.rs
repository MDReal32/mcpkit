use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use serde_json::{Map, Value};

/// Reads `opencode.jsonc` when there is one, like opencode itself.
pub const OPENCODE: ClientDefinition = ClientDefinition {
    id: "opencode",
    name: "opencode",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![context.xdg_config_dir.join("opencode")],
    config_path: |context| {
        let dir = context.xdg_config_dir.join("opencode");
        let jsonc_path = dir.join("opencode.jsonc");
        if jsonc_path.exists() {
            jsonc_path
        } else {
            dir.join("opencode.json")
        }
    },
    servers_path: &["mcp"],
    create_entry: |launch| {
        let command: Vec<String> = [launch.command.clone()]
            .into_iter()
            .chain(launch.args.iter().cloned())
            .collect();
        Map::from_iter([
            ("type".to_owned(), Value::from("local")),
            ("command".to_owned(), Value::from(command)),
            ("enabled".to_owned(), Value::Bool(true)),
        ])
    },
};
