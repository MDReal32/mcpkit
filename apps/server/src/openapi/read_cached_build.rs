use crate::openapi::built_tools_cache::BuiltToolsCache;
use crate::openapi::cached_build::CachedBuild;
use crate::openapi::consts::{HOSTS_FILE_NAME, TOOLS_FILE_EXTENSION};
use crate::openapi::host_record::HostRecord;
use crate::openapi::read_json_file::read_json_file;
use crate::openapi::to_cache_file_stem::to_cache_file_stem;
use crate::openapi::to_host_key::to_host_key;
use indexmap::IndexMap;
use std::path::Path;

/// The tools built earlier for the host, with its record; `None` when they were never built or their file is gone.
pub async fn read_cached_build(dir: &Path, domain: Option<&str>) -> Result<Option<CachedBuild>, String> {
    let records: Option<IndexMap<String, HostRecord>> = read_json_file(&dir.join(HOSTS_FILE_NAME)).await?;
    let Some(record) = records.and_then(|mut records| records.shift_remove(to_host_key(domain))) else {
        return Ok(None);
    };
    let stem = to_cache_file_stem(&record.source, record.spec_version.as_deref());
    let file = dir.join(format!("{stem}.{TOOLS_FILE_EXTENSION}"));
    let built: Option<BuiltToolsCache> = read_json_file(&file).await?;
    Ok(built.map(|built| CachedBuild { record, built }))
}
