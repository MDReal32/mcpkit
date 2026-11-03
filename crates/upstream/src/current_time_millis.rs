use std::time::{SystemTime, UNIX_EPOCH};

/// `Date.now()`; a clock before the epoch reads as 0.
pub fn current_time_millis() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map(|elapsed| u64::try_from(elapsed.as_millis()).unwrap_or(u64::MAX))
        .unwrap_or(0)
}
