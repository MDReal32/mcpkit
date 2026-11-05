use crate::upstream::consts::DISCOVERY_MAX_AGE;
use std::time::SystemTime;

/// A list discovered a day ago or longer, or at a time that cannot be read, is asked for again.
pub fn is_cache_stale(discovered_at: &str, now: SystemTime) -> bool {
    match humantime::parse_rfc3339(discovered_at) {
        Ok(discovered) => now.duration_since(discovered).is_ok_and(|age| age >= DISCOVERY_MAX_AGE),
        Err(_) => true,
    }
}
