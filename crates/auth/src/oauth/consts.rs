use std::time::Duration;

pub const TOKEN_REQUEST_TIMEOUT: Duration = Duration::from_secs(30);

/// Tokens this close to expiry, in milliseconds, are refreshed before use.
pub const EXPIRY_SKEW_MS: f64 = 60_000.0;

pub const MS_PER_SECOND: f64 = 1000.0;

pub const DEFAULT_TOKEN_TYPE: &str = "bearer";

pub const TOKEN_REQUEST_CONTENT_TYPE: &str = "application/x-www-form-urlencoded";
