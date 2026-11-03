use crate::config::jsonc::compute_indent_level::compute_indent_level;
use crate::config::jsonc::detect_eol::detect_eol;
use crate::config::jsonc::format_scope::FormatScope;
use crate::config::jsonc::is_eol::is_eol;
use crate::config::jsonc::range_formatter::RangeFormatter;
use crate::config::jsonc::text_edit::TextEdit;

/// jsonc-parser's `format(document, { offset, length }, options)` with `indent_size` spaces per level: the edits that
/// reformat the lines the range touches.
pub fn format_range(document: &str, offset: usize, length: usize, indent_size: usize) -> Vec<TextEdit> {
    let bytes = document.as_bytes();
    let range_end = offset + length;
    let mut text_start = offset;
    while text_start > 0 && !is_eol(bytes, text_start - 1) {
        text_start -= 1;
    }
    let mut text_end = range_end;
    while text_end < bytes.len() && !is_eol(bytes, text_end) {
        text_end += 1;
    }
    let scope = FormatScope {
        document,
        text_start,
        text_end,
        range_start: offset,
        range_end,
        initial_indent_level: compute_indent_level(&document[text_start..text_end], indent_size),
        indent: " ".repeat(indent_size),
        eol: detect_eol(document),
    };
    RangeFormatter::new(scope).run()
}
