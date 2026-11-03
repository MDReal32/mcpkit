use crate::config::jsonc::apply_edit::apply_edit;
use crate::config::jsonc::format_range::format_range;
use crate::config::jsonc::is_eol::is_eol;
use crate::config::jsonc::text_edit::TextEdit;

/// jsonc-parser's `withFormatting` followed by `applyEdits`: applies `edit`, then reformats the lines it touched.
pub fn with_formatting(text: &str, edit: &TextEdit, indent_size: usize) -> String {
    let mut updated = apply_edit(text, edit);
    let mut begin = edit.offset;
    let mut end = edit.offset + edit.content.len();
    if edit.length == 0 || edit.content.is_empty() {
        let bytes = updated.as_bytes();
        while begin > 0 && !is_eol(bytes, begin - 1) {
            begin -= 1;
        }
        while end < bytes.len() && !is_eol(bytes, end) {
            end += 1;
        }
    }
    let edits = format_range(&updated, begin, end - begin, indent_size);
    for format_edit in edits.iter().rev() {
        updated = apply_edit(&updated, format_edit);
    }
    updated
}
