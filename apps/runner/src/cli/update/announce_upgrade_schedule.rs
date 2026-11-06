use crate::cli::update::schedule_upgrades::schedule_upgrades;
use crate::cli::update::upgrade_schedule_change::UpgradeScheduleChange;
use usemcpkit_binary::BinaryContext;

/// Install-time scheduling as chosen; a failure is reported but does not fail the install, since `serve` brings the job
/// in line again.
pub async fn announce_upgrade_schedule(context: &BinaryContext, auto_update: bool) {
    match schedule_upgrades(context, auto_update).await {
        Ok(UpgradeScheduleChange::Added) => println!("Scheduled \"usemcpkit upgrade\" to run every few hours."),
        Ok(UpgradeScheduleChange::Removed) => println!("Removed the scheduled \"usemcpkit upgrade\"."),
        Ok(UpgradeScheduleChange::Unchanged) => {}
        Err(error) => eprintln!("Could not change the scheduled upgrades: {error}"),
    }
}
