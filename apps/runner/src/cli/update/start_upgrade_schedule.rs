use crate::cli::update::schedule_upgrades::schedule_upgrades;
use crate::cli::update::upgrade_schedule_change::UpgradeScheduleChange;
use usemcpkit_binary::{BinaryContext, is_installed_binary};

/// Fire-and-forget from `serve`: loads the scheduled upgrade, or unloads it when `USEMCPKIT_AUTOUPDATE` is `0` or this
/// is a dev build, so the job follows what the client entry says; a failure never affects serving.
pub fn start_upgrade_schedule(context: BinaryContext) {
    tokio::task::spawn_local(async move {
        if !is_installed_binary(&context) {
            return;
        }
        match schedule_upgrades(&context, context.updates_itself()).await {
            Ok(UpgradeScheduleChange::Added) => {
                eprintln!("usemcpkit: scheduled \"usemcpkit upgrade\" to run every few hours");
            }
            Ok(UpgradeScheduleChange::Removed) => {
                eprintln!("usemcpkit: removed the scheduled \"usemcpkit upgrade\" (auto-update is off)");
            }
            Ok(UpgradeScheduleChange::Unchanged) => {}
            Err(error) => eprintln!("usemcpkit: could not change the scheduled upgrades: {error}"),
        }
    });
}
