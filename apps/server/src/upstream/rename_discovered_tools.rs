use crate::upstream::discovered_tool::DiscoveredTool;
use crate::upstream::to_catalog_tool_names::to_catalog_tool_names;
use usemcpkit_manifest::upstream::UpstreamNameRule;

/// The tools with their catalog names worked out again from the manifest's current rules, so a cached list never
/// keeps names an older manifest gave.
pub fn rename_discovered_tools(
    tools: Vec<DiscoveredTool>,
    naming: Option<&[UpstreamNameRule]>,
) -> Result<Vec<DiscoveredTool>, String> {
    let upstream_names: Vec<&str> = tools.iter().map(|tool| tool.upstream_name.as_str()).collect();
    let names = to_catalog_tool_names(&upstream_names, naming)?;
    Ok(tools
        .into_iter()
        .zip(names)
        .map(|(tool, name)| DiscoveredTool { name, ..tool })
        .collect())
}
