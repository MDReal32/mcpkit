use crate::binary_error::BinaryError;
use crate::schedule::consts::SCHEDULED_TASK_NAME;
use crate::schedule::run_scheduler_command::run_scheduler_command;
use usemcpkit_core::env::Env;

pub async fn is_scheduled_task_registered(env: &Env) -> Result<bool, BinaryError> {
    let result = run_scheduler_command("schtasks", &["/Query", "/TN", SCHEDULED_TASK_NAME], None, env).await?;
    Ok(result.exit_code == 0)
}
