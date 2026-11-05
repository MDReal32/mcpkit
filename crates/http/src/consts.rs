/// Node's fetch always named itself; some APIs refuse a request without a `User-Agent`. Manifest headers override it.
pub const USER_AGENT: &str = concat!("usemcpkit/", env!("CARGO_PKG_VERSION"));

/// What fetch sends for a file part whose blob has no type.
pub const FILE_PART_CONTENT_TYPE: &str = "application/octet-stream";

/// fetch's `response.text()` drops a leading byte order mark.
pub const UTF8_BOM: &[u8] = b"\xEF\xBB\xBF";
