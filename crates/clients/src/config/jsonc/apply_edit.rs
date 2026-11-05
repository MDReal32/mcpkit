use crate::config::jsonc::text_edit::TextEdit;

pub fn apply_edit(text: &str, edit: &TextEdit) -> String {
    format!(
        "{}{}{}",
        &text[..edit.offset],
        edit.content,
        &text[edit.offset + edit.length..]
    )
}
