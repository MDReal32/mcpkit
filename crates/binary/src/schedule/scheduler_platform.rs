#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub enum SchedulerPlatform {
    Launchd,
    TaskScheduler,
    Cron,
}
