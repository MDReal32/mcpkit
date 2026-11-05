use crate::guards::is_word::is_word;

/// `^[a-z][a-z0-9-]*$`, the pattern of a category and of an edition name.
pub fn is_category_name(text: &str) -> bool {
    is_word(
        text,
        |first| first.is_ascii_lowercase(),
        |rest| rest.is_ascii_lowercase() || rest.is_ascii_digit() || rest == '-',
    )
}
