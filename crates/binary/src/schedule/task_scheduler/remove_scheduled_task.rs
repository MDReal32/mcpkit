use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use crate::schedule::task_scheduler::is_scheduled_task_registered::is_scheduled_task_registered;
use usemcpkit_core::env::Env;

/// `true` when there was a task named `name` to remove.
pub async fn remove_scheduled_task(name: &str, env: &Env) -> Result<bool, BinaryError> {
    if !is_scheduled_task_registered(name, env).await? {
        return Ok(false);
    }
    let result = run_scheduler_command("schtasks", &["/Delete", "/TN", name, "/F"], None, env).await?;
    assert_scheduler_success(&result, "schtasks /Delete")?;
    Ok(true)
}
