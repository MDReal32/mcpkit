use std::time::Duration;

pub const UPSTREAM_CACHE_DIR_NAME: &str = "upstream";

/// Every tool of an upstream server no naming rule matches is `tools:<name>`, so the catalog sees one group and a verb
/// per tool.
pub const UPSTREAM_TOOL_GROUP: &str = "tools";

pub const DISCOVERY_MAX_AGE: Duration = Duration::from_secs(24 * 60 * 60);

pub const REPOS_DIR_NAME: &str = "repos";

/// Put in front of a tool name that does not start with a letter.
pub const LEADING_LETTER_PREFIX: &str = "t_";

/// A server opens by group only when every tool has at least `<group>:<resource>:<action>`.
pub const MIN_SEGMENTS_TO_GROUP: usize = 3;
