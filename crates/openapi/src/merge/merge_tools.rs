use crate::merge::HostSource;
use crate::merge::tool_applies_to::tool_applies_to;
use std::collections::HashSet;
use usemcpkit_manifest::tool::ToolSpec;

/// The tools of an OpenAPI server, sorted by name: the hand-written ones that apply to one of the host's sources at
/// its version, then the built ones of each source in order whose name neither a hand-written tool, a tool of an
/// earlier source nor a tool of its MCP server (`reserved`) takes.
pub fn merge_tools(
    built: Vec<Vec<ToolSpec>>,
    hand_written: &[ToolSpec],
    reserved: &HashSet<String>,
    sources: &[HostSource],
) -> Vec<ToolSpec> {
    let mut tools: Vec<ToolSpec> = hand_written
        .iter()
        .filter(|tool| {
            sources
                .iter()
                .any(|source| tool_applies_to(tool.applies.as_ref(), &source.name, source.version.as_deref()))
        })
        .cloned()
        .collect();
    let mut taken: HashSet<String> = tools.iter().map(|tool| tool.name.clone()).collect();
    for tool in built.into_iter().flatten() {
        if !reserved.contains(&tool.name) && taken.insert(tool.name.clone()) {
            tools.push(tool);
        }
    }
    tools.sort_by(|left, right| left.name.cmp(&right.name));
    tools
}
