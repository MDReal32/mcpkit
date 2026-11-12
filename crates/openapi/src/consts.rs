/// Longer descriptions are cut, so a tool listing stays readable.
pub const MAX_DESCRIPTION_LENGTH: usize = 400;

pub const DEFAULT_MAX_DEPTH: u32 = 3;

/// The methods an endpoint becomes a tool for, in the order they are read.
pub const HTTP_METHODS: [&str; 5] = ["get", "post", "put", "patch", "delete"];

pub const JSON_TYPES: [&str; 6] = ["string", "number", "integer", "boolean", "array", "object"];

pub const SCALAR_TYPES: [&str; 4] = ["string", "number", "integer", "boolean"];

pub const JSON_CONTENT_TYPE: &str = "application/json";

pub const MULTIPART_CONTENT_TYPE: &str = "multipart/form-data";

pub const FORM_CONTENT_TYPE: &str = "application/x-www-form-urlencoded";

pub const BINARY_CONTENT_TYPE: &str = "application/octet-stream";

/// The argument holding a body that has no named properties.
pub const WHOLE_BODY_ARGUMENT: &str = "body";

pub const SAVE_TO_ARGUMENT: &str = "save_to";

pub const SAVE_TO_DESCRIPTION: &str = "Local path the downloaded file is saved to.";

pub const FILES_ARGUMENT_DESCRIPTION: &str = "Paths of the local files to upload.";

pub const FILE_ARGUMENT_DESCRIPTION: &str = "Path of a local file to upload.";

pub const COMMA_SEPARATED_SUFFIX: &str = "(comma-separated)";

pub const DEPRECATED_LABEL: &str = "[Deprecated]";

/// Put before an argument name another argument already took, by where the argument comes from.
pub const PATH_PREFIX: &str = "path_";
pub const QUERY_PREFIX: &str = "query_";
pub const BODY_PREFIX: &str = "body_";

/// The group of a fallback name when a path has no literal segment.
pub const ROOT_SEGMENT: &str = "root";

/// Put before a name segment that would start with a digit.
pub const DIGIT_SEGMENT_PREFIX: &str = "v";

/// Headers the executor sets itself (auth, body type, answer type); a parameter for one is not a reason to skip.
pub const EXECUTOR_HEADERS: [&str; 3] = ["authorization", "content-type", "accept"];

/// The argument name of a parameter whose name has no letter or digit.
pub const UNNAMED_ARGUMENT: &str = "value";
