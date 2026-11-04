use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::schedule::consts::{
    LAUNCH_AGENT_LABEL, LEGACY_LAUNCH_AGENT_LABEL, LEGACY_SCHEDULED_TASK_NAME, SCHEDULED_TASK_NAME,
};
use crate::schedule::cron::update_cron_entry;
use crate::schedule::launchd::remove_launch_agent;
use crate::schedule::scheduler_platform::SchedulerPlatform;
use crate::schedule::task_scheduler::remove_scheduled_task;
use crate::schedule::to_scheduler_platform::to_scheduler_platform;

/// Undoes `ensure_upgrade_schedule`, the job of an older `mcpkit` release included; `true` when there was a job to
/// remove.
pub async fn remove_upgrade_schedule(context: &BinaryContext) -> Result<bool, BinaryError> {
    match to_scheduler_platform(context.target) {
        SchedulerPlatform::Launchd => {
            let removed = remove_launch_agent(LAUNCH_AGENT_LABEL, &context.env).await?;
            let removed_legacy = remove_launch_agent(LEGACY_LAUNCH_AGENT_LABEL, &context.env).await?;
            Ok(removed || removed_legacy)
        }
        SchedulerPlatform::TaskScheduler => {
            let removed = remove_scheduled_task(SCHEDULED_TASK_NAME, &context.env).await?;
            let removed_legacy = remove_scheduled_task(LEGACY_SCHEDULED_TASK_NAME, &context.env).await?;
            Ok(removed || removed_legacy)
        }
        SchedulerPlatform::Cron => update_cron_entry(None, &context.env).await,
    }
}
