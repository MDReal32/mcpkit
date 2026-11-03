use crate::client_error::ClientError;
use mcpkit_core::js::JS_WHITESPACE;
use regex::Regex;
use std::path::Path;

/// An entry written as an inline table cannot be edited line by line; ask for a manual edit instead. Matches what the
/// TypeScript CLI tests with `/^\s*(?:servers\.)?name\s*=\s*\{/m`, whose `\s` may run across lines.
pub fn assert_no_inline_toml_entry(
    text: &str,
    servers_path: &[&str],
    name: &str,
    path: &Path,
) -> Result<(), ClientError> {
    let space: String = JS_WHITESPACE
        .iter()
        .map(|character| format!("\\x{{{:x}}}", u32::from(*character)))
        .collect();
    let prefix = servers_path
        .iter()
        .map(|segment| regex::escape(segment))
        .collect::<Vec<_>>()
        .join(r"\.");
    let pattern = format!(
        r"(?:\A|[\n\r\x{{2028}}\x{{2029}}])[{space}]*(?:{prefix}\.)?{name}[{space}]*=[{space}]*\{{",
        name = regex::escape(name)
    );
    let inline = Regex::new(&pattern).map_err(|error| ClientError(format!("{pattern}: {error}")))?;
    if inline.is_match(text) {
        return Err(ClientError(format!(
            "{}: \"{name}\" is defined as an inline table; remove it by hand and run again",
            path.display()
        )));
    }
    Ok(())
}
