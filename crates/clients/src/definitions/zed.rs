use crate::client_definition::ClientDefinition;
use crate::config_format::ConfigFormat;
use crate::definitions::consts::ENV_KEY;
use crate::definitions::insert_launch_env::insert_launch_env;
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
        let mut entry = Map::from_iter([
            ("command".to_owned(), Value::from(launch.command.clone())),
            ("args".to_owned(), launch_args(launch)),
        ]);
        insert_launch_env(&mut entry, ENV_KEY, launch);
        entry.insert("enabled".to_owned(), Value::Bool(true));
        entry
    },
    settings: &[],
};
