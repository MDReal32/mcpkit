use crate::cli::consts::AUTO_UPDATE_RECHECK_INTERVAL;
use crate::cli::update::check_for_update::check_for_update;
use tokio::time::MissedTickBehavior;
use usemcpkit_binary::BinaryContext;

/// Fire-and-forget: checks once now and then every `AUTO_UPDATE_RECHECK_INTERVAL`, so a runner that stays up for days
/// still finds a new release; the update state decides whether its own check interval has passed.
pub fn start_auto_update(context: BinaryContext) {
    tokio::task::spawn_local(async move {
        let mut ticks = tokio::time::interval(AUTO_UPDATE_RECHECK_INTERVAL);
        ticks.set_missed_tick_behavior(MissedTickBehavior::Delay);
        loop {
            ticks.tick().await;
            check_for_update(&context).await;
        }
    });
}
