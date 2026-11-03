use crate::definitions::launch_args::launch_args;
use crate::launch_command::LaunchCommand;
use serde_json::{Map, Value};

pub fn create_command_entry(launch: &LaunchCommand) -> Map<String, Value> {
    Map::from_iter([
        ("command".to_owned(), Value::from(launch.command.clone())),
        ("args".to_owned(), launch_args(launch)),
    ])
}
