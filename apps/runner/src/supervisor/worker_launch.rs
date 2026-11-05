use std::ffi::OsString;
use std::path::PathBuf;

#[derive(Clone, Debug)]
pub struct WorkerLaunch {
    pub command: PathBuf,
    pub args: Vec<String>,
    /// Set on top of the environment the supervisor inherited.
    pub env: Vec<(OsString, OsString)>,
}
