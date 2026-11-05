use crate::js::consts::JS_WHITESPACE;

/// Whether JavaScript's `\s` matches `character`.
pub fn is_js_whitespace(character: char) -> bool {
    JS_WHITESPACE.contains(&character)
}
