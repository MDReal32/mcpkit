/// `^[A-Za-z0-9._-]+$`: a program found on PATH, never a path.
pub fn is_program_name(text: &str) -> bool {
    !text.is_empty()
        && text
            .chars()
            .all(|character| character.is_ascii_alphanumeric() || "._-".contains(character))
}
