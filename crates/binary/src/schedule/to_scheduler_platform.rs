use crate::platform::Target;
use crate::schedule::scheduler_platform::SchedulerPlatform;

pub fn to_scheduler_platform(target: Target) -> SchedulerPlatform {
    let name = target.name();
    if name.starts_with("darwin-") {
        return SchedulerPlatform::Launchd;
    }
    if name.starts_with("windows-") {
        return SchedulerPlatform::TaskScheduler;
    }
    SchedulerPlatform::Cron
}
