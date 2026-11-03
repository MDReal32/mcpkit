use crate::upstream::discover_from_upstream::discover_from_upstream;
use crate::upstream::discovered_tool::DiscoveredTool;
use crate::upstream::tool_cache::ToolCache;
use crate::upstream::write_tool_cache::write_tool_cache;
use mcpkit_execution::CallContext;
use mcpkit_manifest::Manifest;
use std::path::Path;
use std::time::SystemTime;

/// Asks the upstream for its tools and caches them.
pub async fn refresh_tools(
    dir: &Path,
    server_id: &str,
    manifest: &Manifest,
    calls: &CallContext,
) -> Result<Vec<DiscoveredTool>, String> {
    let tools = discover_from_upstream(manifest, calls).await?;
    let cache = ToolCache {
        discovered_at: humantime::format_rfc3339_millis(SystemTime::now()).to_string(),
        tools,
    };
    write_tool_cache(dir, server_id, &cache).await?;
    Ok(cache.tools)
}
