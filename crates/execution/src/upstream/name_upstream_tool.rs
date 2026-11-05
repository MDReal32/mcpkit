use crate::upstream::is_catalog_tool_name::is_catalog_tool_name;
use crate::upstream::replace_first_match::replace_first_match;
use regex::Regex;
use usemcpkit_manifest::upstream::UpstreamNameRule;

/// The catalog name `rules` give an upstream tool, from the first rule whose `match` finds the tool name, or `None`
/// when none does. Like JavaScript's `String.prototype.replace`, only the first match is replaced. A name that is not
/// `<group>:<resource>:<action>` in lowercase snake case is an error in the manifest, never silently replaced.
pub fn name_upstream_tool(rules: Option<&[UpstreamNameRule]>, upstream_name: &str) -> Result<Option<String>, String> {
    for rule in rules.into_iter().flatten() {
        let pattern = Regex::new(&rule.pattern)
            .map_err(|error| format!("naming rule \"{}\" is not a regular expression: {error}", rule.pattern))?;
        let Some(captures) = pattern.captures(upstream_name) else {
            continue;
        };
        let name = replace_first_match(upstream_name, &pattern, &captures, &rule.name);
        if !is_catalog_tool_name(&name) {
            return Err(format!(
                "naming rule \"{}\" turned \"{upstream_name}\" into \"{name}\", which is not <group>:<resource>:<action>",
                rule.pattern
            ));
        }
        return Ok(Some(name));
    }
    Ok(None)
}
