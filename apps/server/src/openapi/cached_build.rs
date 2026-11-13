use crate::openapi::built_tools_cache::BuiltToolsCache;
use crate::openapi::host_record::HostRecord;

/// The tools built for one host, one list per source of its record, with what was known about the host when they were.
pub struct CachedBuild {
    pub record: HostRecord,
    pub built: Vec<BuiltToolsCache>,
}
