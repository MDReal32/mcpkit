use crate::cli::consts::EXIT_SUCCESS;
use crate::cli::run_command::run_command;
use usemcpkit_auth::config::{load_config, redact_config};
use usemcpkit_core::env::Env;
use usemcpkit_core::home::resolve_env_home_dir;
use usemcpkit_core::js::to_js_json_pretty;

/// Prints the saved config with its secrets and tokens masked.
pub fn config_command() -> i32 {
    run_command(async {
        let home = resolve_env_home_dir(&Env::from_process())?;
        let config = load_config(&home).await.map_err(|error| error.0)?;
        println!(
            "{}",
            to_js_json_pretty(&serde_json::Value::Object(redact_config(&config)))
        );
        Ok(EXIT_SUCCESS)
    })
}
