use crate::config::toml::consts::JS_LINE_TERMINATORS;
use mcpkit_core::js::{is_js_whitespace, js_trim_start};

/// The dotted key of a `[table]` header line with whitespace removed, or `None` for any other line: what the
/// TypeScript CLI reads with `/^\s*\[([^[\]]+)\]\s*(?:#.*)?$/`. A comment holding a `\r` (a CRLF file) is no header,
/// since `.` stops there.
pub fn read_toml_header(line: &str) -> Option<String> {
    let inside = js_trim_start(line).strip_prefix('[')?;
    let close = inside.find(['[', ']'])?;
    if close == 0 || !inside[close..].starts_with(']') {
        return None;
    }
    let rest = js_trim_start(&inside[close + 1..]);
    let ends_cleanly = rest.is_empty() || (rest.starts_with('#') && !rest.contains(JS_LINE_TERMINATORS));
    if !ends_cleanly {
        return None;
    }
    Some(
        inside[..close]
            .chars()
            .filter(|character| !is_js_whitespace(*character))
            .collect(),
    )
}
