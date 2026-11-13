use usemcpkit_manifest::naming::apply_naming_rule;
use usemcpkit_manifest::upstream::UpstreamNameRule;

/// The catalog name `rules` give an upstream tool, from the first rule whose `match` finds the tool name, or `None`
/// when none does.
pub fn name_upstream_tool(rules: Option<&[UpstreamNameRule]>, upstream_name: &str) -> Result<Option<String>, String> {
    for rule in rules.into_iter().flatten() {
        if let Some(name) = apply_naming_rule(&rule.pattern, &rule.name, upstream_name)? {
            return Ok(Some(name));
        }
    }
    Ok(None)
}
