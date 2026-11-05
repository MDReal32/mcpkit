use std::time::{SystemTime, UNIX_EPOCH};

/// Milliseconds since the epoch, 0 on a clock set before it.
pub fn now_ms() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_or(0, |elapsed| u64::try_from(elapsed.as_millis()).unwrap_or(u64::MAX))
}
