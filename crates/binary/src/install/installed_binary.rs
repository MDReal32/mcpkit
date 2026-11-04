use std::path::PathBuf;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct InstalledBinary {
    /// The runner, the path written into client configs.
    pub path: PathBuf,
    pub server_path: PathBuf,
    pub version: String,
}
