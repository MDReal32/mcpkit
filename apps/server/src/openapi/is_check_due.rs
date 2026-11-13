use crate::openapi::consts::VERSION_CHECK_INTERVAL;
use std::time::SystemTime;

/// Whether a version asked at `checked_at` is asked again: a day later, or when the time cannot be read.
pub fn is_check_due(checked_at: &str, now: SystemTime) -> bool {
    match humantime::parse_rfc3339(checked_at) {
        Ok(checked) => now
            .duration_since(checked)
            .is_ok_and(|age| age >= VERSION_CHECK_INTERVAL),
        Err(_) => true,
    }
}
