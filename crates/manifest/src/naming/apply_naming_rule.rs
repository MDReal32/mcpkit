use crate::naming::is_catalog_tool_name::is_catalog_tool_name;
use crate::naming::replace_first_match::replace_first_match;
use regex::Regex;

/// The catalog name a naming rule gives `subject`, or `None` when its `pattern` does not match. Like JavaScript's
/// `String.prototype.replace`, only the first match is replaced. A name that is not `<group>:<resource>:<action>` in
/// lowercase snake case is an error in the manifest, never silently replaced.
pub fn apply_naming_rule(pattern: &str, template: &str, subject: &str) -> Result<Option<String>, String> {
    let regex = Regex::new(pattern)
        .map_err(|error| format!("naming rule \"{pattern}\" is not a regular expression: {error}"))?;
    let Some(captures) = regex.captures(subject) else {
        return Ok(None);
    };
    let name = replace_first_match(subject, &regex, &captures, template);
    if !is_catalog_tool_name(&name) {
        return Err(format!(
            "naming rule \"{pattern}\" turned \"{subject}\" into \"{name}\", which is not <group>:<resource>:<action>"
        ));
    }
    Ok(Some(name))
}
