/// `TOOL_NAME_PATTERN` as core prints it in its errors.
pub const TOOL_NAME_PATTERN: &str = "/^[a-z][a-z0-9_]*(:[a-z][a-z0-9_]*)*$/";

/// What else a hand-written tool of a manifest with `openapi` may be named.
pub const ENDPOINT_TOOL_NAME: &str = "an endpoint, <path>:<method>";
