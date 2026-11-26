use serde::{Deserialize, Serialize};

/// A port a program wrote to its own log when it started listening.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct LogPortSource {
    /// Glob patterns of the log files, a leading `~/` meaning the user's home; the file changed last that has a match
    /// is read.
    pub files: Vec<String>,
    /// A regular expression whose first capture group is the port; the last match in the file wins.
    pub pattern: String,
}
