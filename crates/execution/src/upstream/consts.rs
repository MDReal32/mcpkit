/// The one option of the form that asks for a stdio upstream's forwarded credentials.
pub const FORWARDED_OPTION_INDEX: usize = 0;

/// A catalog tool name has at least `<group>:<resource>:<action>`.
pub const MIN_CATALOG_NAME_SEGMENTS: usize = 3;

/// Added to the manifest's name to remember the auth option of its upstream apart from the one of its own tools.
pub const UPSTREAM_PREFERENCE_SUFFIX: &str = ":upstream";
