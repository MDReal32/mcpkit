use crate::js::is_js_whitespace::is_js_whitespace;

/// `text.trimEnd()`.
pub fn js_trim_end(text: &str) -> &str {
    text.trim_end_matches(is_js_whitespace)
}
