use std::time::{SystemTime, UNIX_EPOCH};

/// Whole milliseconds since the epoch, like `Date.now()`, the unit `expiresAt` is stored in.
pub fn now_epoch_ms() -> f64 {
    SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_or(0.0, |elapsed| elapsed.as_millis() as f64)
}
