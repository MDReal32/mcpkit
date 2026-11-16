/// The pattern an OpenAPI source name must match, as the errors print it.
pub const SOURCE_NAME_PATTERN: &str = "/^[a-z][a-z0-9-]*$/";

/// The string fields of a source's `options`.
pub const OPTION_TEXT_KEYS: &[&str] = &["descriptionPrefix", "filePartName"];

/// The boolean fields of a source's `options`.
pub const OPTION_FLAG_KEYS: &[&str] = &[
    "includeDefaults",
    "stripBold",
    "widenMixedScalars",
    "keepsExplodedArrays",
    "skipDeprecated",
];

/// The fields of a source's `options` that are lists of regular expressions.
pub const OPTION_PATTERN_KEYS: &[&str] = &["downloadPaths", "skip"];

/// Replaced by the version picked in a versioned source's url.
pub const VERSION_PLACEHOLDER: &str = "{version}";
