use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::schedule::cron::update_cron_entry;
use crate::schedule::launchd::remove_launch_agent;
use crate::schedule::scheduler_platform::SchedulerPlatform;
use crate::schedule::task_scheduler::remove_scheduled_task;
use crate::schedule::to_scheduler_platform::to_scheduler_platform;

/// Undoes `ensure_upgrade_schedule`; `true` when there was a job to remove.
pub async fn remove_upgrade_schedule(context: &BinaryContext) -> Result<bool, BinaryError> {
    match to_scheduler_platform(context.target) {
        SchedulerPlatform::Launchd => remove_launch_agent(&context.env).await,
        SchedulerPlatform::TaskScheduler => remove_scheduled_task(&context.env).await,
        SchedulerPlatform::Cron => update_cron_entry(None, &context.env).await,
    }
}
