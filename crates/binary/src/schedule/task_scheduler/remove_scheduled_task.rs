use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::consts::SCHEDULED_TASK_NAME;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use crate::schedule::task_scheduler::is_scheduled_task_registered::is_scheduled_task_registered;
use mcpkit_core::env::Env;

pub async fn remove_scheduled_task(env: &Env) -> Result<bool, BinaryError> {
    if !is_scheduled_task_registered(env).await? {
        return Ok(false);
    }
    let result = run_scheduler_command("schtasks", &["/Delete", "/TN", SCHEDULED_TASK_NAME, "/F"], None, env).await?;
    assert_scheduler_success(&result, "schtasks /Delete")?;
    Ok(true)
}
