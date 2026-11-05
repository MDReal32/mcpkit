use crate::js::is_js_whitespace::is_js_whitespace;

/// `text.trimStart()`.
pub fn js_trim_start(text: &str) -> &str {
    text.trim_start_matches(is_js_whitespace)
}
