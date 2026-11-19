use std::time::{Duration, UNIX_EPOCH};

/// A time given in milliseconds since the epoch as a UTC time to the second, such as `2026-11-18T09:12:00Z`.
pub fn format_timestamp(epoch_ms: f64) -> String {
    let elapsed = Duration::from_millis(epoch_ms.max(0.0) as u64);
    humantime::format_rfc3339_seconds(UNIX_EPOCH + elapsed).to_string()
}

#[cfg(test)]
mod tests {
    use super::format_timestamp;

    #[test]
    fn writes_a_utc_time_to_the_second() {
        assert_eq!(format_timestamp(1_700_000_000_000.0), "2023-11-14T22:13:20Z");
        assert_eq!(format_timestamp(1_700_000_000_999.0), "2023-11-14T22:13:20Z");
    }
}
