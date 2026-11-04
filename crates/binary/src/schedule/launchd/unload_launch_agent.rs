use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::launchd::is_launch_agent_loaded::is_launch_agent_loaded;
use crate::schedule::launchd::to_launchd_domain::to_launchd_domain;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use std::path::Path;
use usemcpkit_core::env::Env;

pub async fn unload_launch_agent(path: &Path, env: &Env) -> Result<(), BinaryError> {
    if !is_launch_agent_loaded(env).await? {
        return Ok(());
    }
    let domain = to_launchd_domain();
    let path = path.to_string_lossy();
    let result = run_scheduler_command("launchctl", &["bootout", &domain, &path], None, env).await?;
    assert_scheduler_success(&result, "launchctl bootout")
}
