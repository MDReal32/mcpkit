use crate::openapi::built_tools_cache::BuiltToolsCache;
use crate::openapi::host_record::HostRecord;

/// The tools built for one host, with what was known about the host when they were.
pub struct CachedBuild {
    pub record: HostRecord,
    pub built: BuiltToolsCache,
}
