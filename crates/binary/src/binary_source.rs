use std::path::PathBuf;

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct BinarySource {
    /// A local runner binary, with `usemcpkit-servers` next to it, to install instead of the running one.
    pub path: Option<PathBuf>,
    pub version: String,
}
