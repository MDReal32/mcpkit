use crate::upstream::discovered_tool::DiscoveredTool;
use crate::upstream::open_upstream::open_upstream;
use crate::upstream::read_listed_tool::read_listed_tool;
use crate::upstream::rename_discovered_tools::rename_discovered_tools;
use mcpkit_execution::CallContext;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::upstream::UpstreamSpec;

/// Starts the upstream, lists its tools and stops it again.
pub async fn discover_from_upstream(manifest: &Manifest, calls: &CallContext) -> Result<Vec<DiscoveredTool>, String> {
    let (connection, listed) = open_upstream(manifest, calls, |connection| {
        Box::pin(async move { connection.list_tools().await })
    })
    .await
    .map_err(|error| error.to_string())?;
    connection.close().await;
    let tools = listed
        .into_iter()
        .map(read_listed_tool)
        .collect::<Result<Vec<_>, _>>()?;
    rename_discovered_tools(tools, manifest.upstream.as_ref().and_then(UpstreamSpec::naming))
}
