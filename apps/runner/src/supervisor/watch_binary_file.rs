use crate::supervisor::file_signature::read_file_signature;
use crate::supervisor::supervisor_event::SupervisorEvent;
use std::io::ErrorKind;
use std::path::PathBuf;
use std::time::Duration;
use tokio::sync::mpsc;
use tokio::task::JoinHandle;
use tokio::time::{Instant, MissedTickBehavior};

/// Polls `path` and reports `BinaryChanged` once after it changed and stayed the same for two polls, so a download in
/// progress is not picked up half written. Polling survives rename-replacement, which file watchers can lose. A missing
/// file is skipped: Windows moves the old binary aside before the new one is in place.
pub async fn watch_binary_file(
    path: PathBuf,
    interval: Duration,
    events: mpsc::UnboundedSender<SupervisorEvent>,
) -> std::io::Result<JoinHandle<()>> {
    let mut applied = read_file_signature(&path).await?;
    Ok(tokio::spawn(async move {
        let mut candidate: Option<String> = None;
        let mut ticks = tokio::time::interval_at(Instant::now() + interval, interval);
        ticks.set_missed_tick_behavior(MissedTickBehavior::Skip);
        loop {
            ticks.tick().await;
            let signature = match read_file_signature(&path).await {
                Ok(signature) => signature,
                Err(error) if error.kind() == ErrorKind::NotFound => continue,
                Err(error) => {
                    eprintln!("usemcpkit: cannot read {}: {error}", path.display());
                    continue;
                }
            };
            if signature == applied {
                candidate = None;
            } else if candidate.as_ref() != Some(&signature) {
                candidate = Some(signature);
            } else {
                applied = signature;
                candidate = None;
                if events.send(SupervisorEvent::BinaryChanged).is_err() {
                    return;
                }
            }
        }
    }))
}
