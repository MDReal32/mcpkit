use crate::cli::update::schedule_upgrades::schedule_upgrades;
use usemcpkit_binary::{BinaryContext, is_installed_binary};

/// Fire-and-forget from `serve`, so installs from before the scheduled upgrade get one too; a failure never affects
/// serving.
pub fn start_upgrade_schedule(context: BinaryContext) {
    tokio::task::spawn_local(async move {
        if !is_installed_binary(&context) {
            return;
        }
        match schedule_upgrades(&context).await {
            Ok(Some(true)) => eprintln!("usemcpkit: scheduled \"usemcpkit upgrade\" to run every few hours"),
            Ok(_) => {}
            Err(error) => eprintln!("usemcpkit: could not schedule upgrades: {error}"),
        }
    });
}
