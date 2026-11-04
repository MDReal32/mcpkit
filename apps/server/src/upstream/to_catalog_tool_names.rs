use crate::upstream::consts::UPSTREAM_TOOL_GROUP;
use crate::upstream::to_segment::to_segment;
use std::collections::HashSet;
use usemcpkit_execution::upstream::name_upstream_tool;
use usemcpkit_manifest::upstream::UpstreamNameRule;

/// Catalog names for upstream tool names, in the same order. A tool a naming rule matches gets the rule's
/// `<group>:<resource>:<action>`; any other, such as `searchIssues` or `search-issues`, becomes
/// `tools:search_issues`. Clashes get a number.
pub fn to_catalog_tool_names(
    upstream_names: &[&str],
    naming: Option<&[UpstreamNameRule]>,
) -> Result<Vec<String>, String> {
    let mut taken = HashSet::new();
    let mut names = Vec::new();
    for upstream_name in upstream_names {
        let base = match name_upstream_tool(naming, upstream_name)? {
            Some(name) => name,
            None => format!("{UPSTREAM_TOOL_GROUP}:{}", to_segment(upstream_name)),
        };
        let mut candidate = base.clone();
        let mut copy = 2;
        while taken.contains(&candidate) {
            candidate = format!("{base}_{copy}");
            copy += 1;
        }
        taken.insert(candidate.clone());
        names.push(candidate);
    }
    Ok(names)
}
