use crate::guards::is_word::is_word;

/// `^[A-Za-z0-9][A-Za-z0-9._-]*$`: a program found on PATH by name, so a manifest cannot point at a file it ships.
pub fn is_cli_command(text: &str) -> bool {
    is_word(
        text,
        |first| first.is_ascii_alphanumeric(),
        |rest| rest.is_ascii_alphanumeric() || "._-".contains(rest),
    )
}
