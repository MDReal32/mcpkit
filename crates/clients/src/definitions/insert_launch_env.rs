use crate::launch_command::LaunchCommand;
use serde_json::{Map, Value};

/// Adds the launch environment under `key` (`env` for most clients), or nothing when it is empty.
pub fn insert_launch_env(entry: &mut Map<String, Value>, key: &str, launch: &LaunchCommand) {
    if launch.env.is_empty() {
        return;
    }
    let env = launch
        .env
        .iter()
        .map(|(name, value)| (name.clone(), Value::from(value.clone())))
        .collect();
    entry.insert(key.to_owned(), Value::Object(env));
}
