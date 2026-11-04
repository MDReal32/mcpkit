use std::time::Duration;

pub const TOKEN_REQUEST_TIMEOUT: Duration = Duration::from_secs(30);

/// Tokens this close to expiry, in milliseconds, are refreshed before use.
pub const EXPIRY_SKEW_MS: f64 = 60_000.0;

pub const MS_PER_SECOND: f64 = 1000.0;

pub const DEFAULT_TOKEN_TYPE: &str = "bearer";

pub const TOKEN_REQUEST_CONTENT_TYPE: &str = "application/x-www-form-urlencoded";

pub const DEFAULT_REDIRECT_PORT: u16 = 8976;

pub const LOOPBACK_HOST: &str = "127.0.0.1";

pub const CALLBACK_PATH: &str = "/callback";

pub const SIGN_IN_TIMEOUT: Duration = Duration::from_secs(5 * 60);

/// How long closing the callback server waits for open connections to finish sending the callback page.
pub const CALLBACK_CLOSE_TIMEOUT: Duration = Duration::from_secs(1);

pub const RANDOM_TOKEN_BYTES: usize = 32;

pub const CALLBACK_PAGE: &str = "<!doctype html><meta charset=\"utf-8\"><title>usemcpkit</title><p>usemcpkit received the authorization. You can close this window.</p>";

pub const CALLBACK_PAGE_CONTENT_TYPE: &str = "text/html; charset=utf-8";
