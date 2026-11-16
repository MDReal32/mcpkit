use crate::consts::UNNAMED_ARGUMENT;

/// A parameter or property name as an argument name: runs of other characters become `_` (`page-id` → `page_id`,
/// `statuses[]` → `statuses`), never empty.
pub fn sanitize_argument_name(name: &str) -> String {
    let mut sanitized = String::with_capacity(name.len());
    let mut pending_separator = false;
    for character in name.chars() {
        if character.is_ascii_alphanumeric() || character == '_' {
            if pending_separator && !sanitized.is_empty() {
                sanitized.push('_');
            }
            pending_separator = false;
            sanitized.push(character);
        } else {
            pending_separator = true;
        }
    }
    let trimmed = sanitized.trim_matches('_');
    if trimmed.is_empty() {
        UNNAMED_ARGUMENT.to_owned()
    } else {
        trimmed.to_owned()
    }
}
