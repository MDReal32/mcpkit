use crate::definitions::launch_args::launch_args;
use crate::launch_command::LaunchCommand;
use serde_json::{Map, Value};

/// Shape of clients that keep a `disabled` switch next to each server (Cline, Kiro, Roo Code).
pub fn create_enabled_entry(launch: &LaunchCommand) -> Map<String, Value> {
    Map::from_iter([
        ("command".to_owned(), Value::from(launch.command.clone())),
        ("args".to_owned(), launch_args(launch)),
        ("disabled".to_owned(), Value::Bool(false)),
    ])
}
