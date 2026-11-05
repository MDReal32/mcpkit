use crate::js::is_js_whitespace::is_js_whitespace;

/// `text.trim()`.
pub fn js_trim(text: &str) -> &str {
    text.trim_matches(is_js_whitespace)
}
