use crate::sync::sync_failure::SyncFailure;

#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct SyncReport {
    pub servers: usize,
    /// Cached manifests and parts (`<id>/<part>`) that were out of date and re-downloaded.
    pub refreshed: Vec<String>,
    pub failed: Vec<SyncFailure>,
}
