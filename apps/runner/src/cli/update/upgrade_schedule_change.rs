/// What bringing the scheduled `usemcpkit upgrade` in line with `USEMCPKIT_AUTOUPDATE` did.
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum UpgradeScheduleChange {
    /// Auto-update is on and the job was not there yet.
    Added,
    /// Auto-update is off and a job was there.
    Removed,
    /// The job was already as auto-update asks.
    Unchanged,
}
