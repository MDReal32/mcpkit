use crate::openapi::built_tools_cache::BuiltToolsCache;
use crate::openapi::consts::TOOLS_FILE_EXTENSION;
use crate::openapi::to_cache_file_stem::to_cache_file_stem;
use crate::openapi::write_json_file::write_json_file;
use std::path::Path;
use std::time::SystemTime;
use usemcpkit_manifest::openapi::OpenApiSource;
use usemcpkit_manifest::registry::RegistryServer;

/// The cache of a source with no published document for the host's version: no built tools, so only the hand-written
/// tools that apply there are served.
pub async fn write_hand_written_only(
    server: &RegistryServer,
    source: &OpenApiSource,
    dir: &Path,
) -> Result<BuiltToolsCache, String> {
    let cache = BuiltToolsCache {
        manifest_sha256: server.sha256.clone(),
        spec_url: String::new(),
        built_at: humantime::format_rfc3339_millis(SystemTime::now()).to_string(),
        tools: Vec::new(),
        skipped: Vec::new(),
    };
    let stem = to_cache_file_stem(&source.name, None);
    write_json_file(&dir.join(format!("{stem}.{TOOLS_FILE_EXTENSION}")), &cache).await?;
    Ok(cache)
}
