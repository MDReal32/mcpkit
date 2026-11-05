/// `SERVER_NAME_PATTERN` as core prints it in its errors.
pub const SERVER_NAME_PATTERN: &str = "/^[a-z][a-z0-9_]*$/";

pub const SERVER_CATEGORY_PATTERN: &str = "/^[a-z][a-z0-9-]*$/";

pub const EDITION_NAME_PATTERN: &str = "/^[a-z][a-z0-9-]*$/";

/// The longest `match` a naming rule may have, in UTF-16 code units like JavaScript's `length`.
pub const MAX_MATCH_LENGTH: usize = 200;

/// Every string key of a manifest's `domain` besides `default`.
pub const DOMAIN_TEXT_KEYS: &[&str] = &["label", "env", "hint", "placeholder"];

/// The keys of a stdio upstream that must be lists of strings when set.
pub const STDIO_LIST_KEYS: &[&str] = &["args", "forwardEnv", "optionalEnv"];
