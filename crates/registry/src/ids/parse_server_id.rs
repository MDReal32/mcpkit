use crate::ids::is_lower_identifier::is_lower_identifier;

/// The category and name of `^[a-z][a-z0-9-]*:[a-z][a-z0-9_]*$`, or `None` for anything else.
pub fn parse_server_id(id: &str) -> Option<(&str, &str)> {
    let (category, name) = id.split_once(':')?;
    let category_valid = is_lower_identifier(category, |character| {
        character.is_ascii_lowercase() || character.is_ascii_digit() || character == '-'
    });
    let name_valid = is_lower_identifier(name, |character| {
        character.is_ascii_lowercase() || character.is_ascii_digit() || character == '_'
    });
    (category_valid && name_valid).then_some((category, name))
}

#[cfg(test)]
mod tests {
    use super::parse_server_id;

    #[test]
    fn accepts_only_category_and_name() {
        assert_eq!(parse_server_id("git:github"), Some(("git", "github")));
        assert_eq!(parse_server_id("cloud-x:my_server2"), Some(("cloud-x", "my_server2")));
        assert_eq!(parse_server_id("git:github:extra"), None);
        assert_eq!(parse_server_id("git:../x"), None);
        assert_eq!(parse_server_id("Git:github"), None);
        assert_eq!(parse_server_id("git:"), None);
    }
}
