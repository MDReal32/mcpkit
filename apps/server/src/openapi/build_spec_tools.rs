use crate::openapi::built_tools_cache::BuiltToolsCache;
use crate::openapi::consts::{SPEC_FILE_EXTENSION, TOOLS_FILE_EXTENSION};
use crate::openapi::download_spec::download_spec;
use crate::openapi::read_json_file::read_json_file;
use crate::openapi::spec_choice::SpecChoice;
use crate::openapi::to_cache_file_stem::to_cache_file_stem;
use crate::openapi::write_json_file::write_json_file;
use indexmap::IndexMap;
use std::path::Path;
use std::time::SystemTime;
use usemcpkit_manifest::openapi::OpenApiSource;
use usemcpkit_manifest::registry::RegistryServer;
use usemcpkit_openapi::build_tools;
use usemcpkit_registry::Fetch;

/// The tools of the chosen document: the ones built earlier from the same document and manifest, or built now from
/// the downloaded document and cached.
pub async fn build_spec_tools<F: Fetch>(
    server: &RegistryServer,
    source: &OpenApiSource,
    naming: &IndexMap<String, String>,
    choice: &SpecChoice,
    dir: &Path,
    fetcher: &F,
) -> Result<BuiltToolsCache, String> {
    let stem = to_cache_file_stem(&source.name, choice.spec_version.as_deref());
    let tools_file = dir.join(format!("{stem}.{TOOLS_FILE_EXTENSION}"));
    let earlier: Option<BuiltToolsCache> = read_json_file(&tools_file).await?;
    if let Some(earlier) = earlier
        && earlier.manifest_sha256 == server.sha256
        && earlier.spec_url == choice.url
    {
        return Ok(earlier);
    }
    let spec_file = dir.join(format!("{stem}.{SPEC_FILE_EXTENSION}"));
    let document = download_spec(&choice.url, source.sha256.as_deref(), &spec_file, fetcher).await?;
    let built = build_tools(&document, source, naming).map_err(|error| error.0)?;
    let cache = BuiltToolsCache {
        manifest_sha256: server.sha256.clone(),
        spec_url: choice.url.clone(),
        built_at: humantime::format_rfc3339_millis(SystemTime::now()).to_string(),
        tools: built.tools,
        skipped: built.skipped,
    };
    write_json_file(&tools_file, &cache).await?;
    Ok(cache)
}
