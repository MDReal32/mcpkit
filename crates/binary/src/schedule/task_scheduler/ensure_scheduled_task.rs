use crate::binary_error::BinaryError;
use crate::schedule::assert_scheduler_success::assert_scheduler_success;
use crate::schedule::consts::{SCHEDULED_TASK_NAME, UPGRADE_ARGS, UPGRADE_INTERVAL_HOURS};
use crate::schedule::run_scheduler_command::run_scheduler_command;
use crate::schedule::task_scheduler::is_scheduled_task_registered::is_scheduled_task_registered;
use crate::schedule::upgrade_schedule::UpgradeSchedule;
use mcpkit_core::env::Env;

/// Registers the task once; Task Scheduler keeps no log of its own here, so `log_path` is unused on Windows.
pub async fn ensure_scheduled_task(schedule: &UpgradeSchedule, env: &Env) -> Result<bool, BinaryError> {
    if is_scheduled_task_registered(env).await? {
        return Ok(false);
    }
    let quoted_binary = format!("\"{}\"", schedule.binary_path.display());
    let task_run = std::iter::once(quoted_binary.as_str())
        .chain(UPGRADE_ARGS.iter().copied())
        .collect::<Vec<_>>()
        .join(" ");
    let interval = UPGRADE_INTERVAL_HOURS.to_string();
    let args = [
        "/Create",
        "/TN",
        SCHEDULED_TASK_NAME,
        "/TR",
        &task_run,
        "/SC",
        "HOURLY",
        "/MO",
        &interval,
        "/F",
    ];
    let result = run_scheduler_command("schtasks", &args, None, env).await?;
    assert_scheduler_success(&result, "schtasks /Create")?;
    Ok(true)
}
