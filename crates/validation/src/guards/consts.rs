/// Every auth type, in the order of core's `AUTH_REQUIRED_KEYS`.
pub const AUTH_TYPES: &[&str] = &["none", "bearer", "header", "query", "basic", "oauth"];

/// The auth types that sign in through the browser.
pub const INTERACTIVE_AUTH_TYPES: &[&str] = &["oauth"];

pub const HTTP_METHODS: &[&str] = &["GET", "POST", "PUT", "PATCH", "DELETE"];

pub const MAX_PORT: f64 = 65_535.0;

/// What `{domain}` is replaced with to check that a base URL parses.
pub const DOMAIN_SAMPLE_VALUE: &str = "example.com";

/// The minimum number of segments of a naming rule's `name`, `<group>:<resource>:<action>`.
pub const MIN_NAME_TEMPLATE_SEGMENTS: usize = 3;
