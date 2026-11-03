use crate::launch_command::LaunchCommand;
use serde_json::Value;

pub fn launch_args(launch: &LaunchCommand) -> Value {
    Value::from(launch.args.clone())
}
