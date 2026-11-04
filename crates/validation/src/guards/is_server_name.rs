use crate::guards::is_word::is_word;

/// `^[a-z][a-z0-9_]*$`.
pub fn is_server_name(text: &str) -> bool {
    is_word(
        text,
        |first| first.is_ascii_lowercase(),
        |rest| rest.is_ascii_lowercase() || rest.is_ascii_digit() || rest == '_',
    )
}
