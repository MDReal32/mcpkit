use crate::cli::update::schedule_upgrades::schedule_upgrades;
use usemcpkit_binary::BinaryContext;

/// Install-time scheduling; a failure is reported but does not fail the install, since `serve` still checks daily.
pub async fn announce_upgrade_schedule(context: &BinaryContext) {
    match schedule_upgrades(context).await {
        Ok(Some(true)) => println!("Scheduled \"usemcpkit upgrade\" to run every few hours."),
        Ok(_) => {}
        Err(error) => eprintln!("Could not schedule upgrades: {error}"),
    }
}
