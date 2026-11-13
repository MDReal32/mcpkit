use crate::merge::tool_applies_to::tool_applies_to;
use std::collections::HashSet;
use usemcpkit_manifest::tool::ToolSpec;

/// The tools of an OpenAPI server, sorted by name: the hand-written ones that apply to its source and version, then
/// the built ones whose name neither a hand-written tool nor a tool of its MCP server (`reserved`) takes.
pub fn merge_tools(
    built: Vec<ToolSpec>,
    hand_written: &[ToolSpec],
    reserved: &HashSet<String>,
    source: &str,
    version: Option<&str>,
) -> Vec<ToolSpec> {
    let mut tools: Vec<ToolSpec> = hand_written
        .iter()
        .filter(|tool| tool_applies_to(tool.applies.as_ref(), source, version))
        .cloned()
        .collect();
    let taken: HashSet<String> = tools.iter().map(|tool| tool.name.clone()).collect();
    tools.extend(
        built
            .into_iter()
            .filter(|tool| !taken.contains(&tool.name) && !reserved.contains(&tool.name)),
    );
    tools.sort_by(|left, right| left.name.cmp(&right.name));
    tools
}
