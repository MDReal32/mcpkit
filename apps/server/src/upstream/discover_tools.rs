use crate::upstream::discovered_tool::DiscoveredTool;
use crate::upstream::is_cache_stale::is_cache_stale;
use crate::upstream::read_tool_cache::read_tool_cache;
use crate::upstream::refresh_tools::refresh_tools;
use std::path::Path;
use std::time::SystemTime;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;

/// The tools of an upstream server. A cached list is returned at once, so opening never waits for an upstream; when it
/// is a day old it is refreshed in the background and a failure is reported on stderr. Without a cache the upstream is
/// asked and its error surfaces. The background refresh runs with `spawn_local`, so it needs a `LocalSet`.
pub async fn discover_tools(
    dir: &Path,
    server_id: &str,
    manifest: &Manifest,
    calls: &CallContext,
) -> Result<Vec<DiscoveredTool>, String> {
    let Some(cached) = read_tool_cache(dir, server_id).await? else {
        return refresh_tools(dir, server_id, manifest, calls).await;
    };
    if is_cache_stale(&cached.discovered_at, SystemTime::now()) {
        let (dir, server_id, manifest, calls) = (dir.to_owned(), server_id.to_owned(), manifest.clone(), calls.clone());
        tokio::task::spawn_local(async move {
            if let Err(error) = refresh_tools(&dir, &server_id, &manifest, &calls).await {
                eprintln!("{server_id}: could not refresh its tools: {error}");
            }
        });
    }
    Ok(cached.tools)
}
