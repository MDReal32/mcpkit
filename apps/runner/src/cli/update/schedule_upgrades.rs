use crate::cli::update::upgrade_schedule_change::UpgradeScheduleChange;
use usemcpkit_binary::schedule::{ensure_upgrade_schedule, remove_upgrade_schedule};
use usemcpkit_binary::{BinaryContext, BinaryError};

/// Loads the scheduled `usemcpkit upgrade` when auto-update is on and unloads it when it is off.
pub async fn schedule_upgrades(
    context: &BinaryContext,
    auto_update: bool,
) -> Result<UpgradeScheduleChange, BinaryError> {
    let changed = if auto_update {
        ensure_upgrade_schedule(context).await?
    } else {
        remove_upgrade_schedule(context).await?
    };
    Ok(match (changed, auto_update) {
        (false, _) => UpgradeScheduleChange::Unchanged,
        (true, true) => UpgradeScheduleChange::Added,
        (true, false) => UpgradeScheduleChange::Removed,
    })
}
