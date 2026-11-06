use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::launch_args::launch_args;
use crate::definitions::resolve_zed_dir::resolve_zed_dir;
use serde_json::{Map, Value};

pub const ZED: ClientDefinition = ClientDefinition {
    id: "zed",
    name: "Zed",
    format: ConfigFormat::Json,
    detect_paths: |context| vec![resolve_zed_dir(context)],
    config_path: |context| resolve_zed_dir(context).join("settings.json"),
    servers_path: &["context_servers"],
    create_entry: |launch| {
        Map::from_iter([
            ("command".to_owned(), Value::from(launch.command.clone())),
            ("args".to_owned(), launch_args(launch)),
            ("enabled".to_owned(), Value::Bool(true)),
        ])
    },
    settings: &[],
};
