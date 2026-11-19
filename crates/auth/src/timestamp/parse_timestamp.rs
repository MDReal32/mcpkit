use std::time::UNIX_EPOCH;

/// A UTC time such as `2026-11-18T09:12:00Z` in milliseconds since the epoch; `None` when it is not one.
pub fn parse_timestamp(text: &str) -> Option<f64> {
    let time = humantime::parse_rfc3339(text).ok()?;
    let elapsed = time.duration_since(UNIX_EPOCH).ok()?;
    Some(elapsed.as_millis() as f64)
}

#[cfg(test)]
mod tests {
    use super::parse_timestamp;

    #[test]
    fn reads_what_format_timestamp_writes() {
        assert_eq!(parse_timestamp("2023-11-14T22:13:20Z"), Some(1_700_000_000_000.0));
        assert_eq!(parse_timestamp("yesterday"), None);
    }
}
