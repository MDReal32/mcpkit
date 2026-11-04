use usemcpkit_binary::schedule::ensure_upgrade_schedule;
use usemcpkit_binary::{BinaryContext, BinaryError};
use usemcpkit_core::update::AUTO_UPDATE_ENV;

/// `Some(true)` when a new scheduled job was registered; `None` when auto-update is turned off.
pub async fn schedule_upgrades(context: &BinaryContext) -> Result<Option<bool>, BinaryError> {
    if context.env.get(AUTO_UPDATE_ENV) == Some("0") {
        return Ok(None);
    }
    ensure_upgrade_schedule(context).await.map(Some)
}
