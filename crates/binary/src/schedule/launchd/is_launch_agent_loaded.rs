use crate::binary_error::BinaryError;
use crate::schedule::consts::LAUNCH_AGENT_LABEL;
use crate::schedule::launchd::to_launchd_domain::to_launchd_domain;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use usemcpkit_core::env::Env;

pub async fn is_launch_agent_loaded(env: &Env) -> Result<bool, BinaryError> {
    let service = format!("{}/{LAUNCH_AGENT_LABEL}", to_launchd_domain());
    let result = run_scheduler_command("launchctl", &["print", &service], None, env).await?;
    Ok(result.exit_code == 0)
}
