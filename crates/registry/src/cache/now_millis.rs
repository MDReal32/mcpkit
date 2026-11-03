use std::time::{SystemTime, UNIX_EPOCH};

/// Epoch milliseconds, like `Date.now()`; a clock set before 1970 reads as 0.
pub fn now_millis() -> u64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_or(0, |elapsed| u64::try_from(elapsed.as_millis()).unwrap_or(u64::MAX))
}
