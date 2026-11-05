use crate::ids::is_lower_identifier::is_lower_identifier;

/// `^[a-z][a-z0-9_]*$`, like `PART_NAME_PATTERN` in the CLI.
pub fn is_part_name(name: &str) -> bool {
    is_lower_identifier(name, |character| {
        character.is_ascii_lowercase() || character.is_ascii_digit() || character == '_'
    })
}
