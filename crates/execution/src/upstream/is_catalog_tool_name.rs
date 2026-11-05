use crate::upstream::consts::MIN_CATALOG_NAME_SEGMENTS;

/// `<group>:<resource>:<action>` or longer, every segment lowercase snake case starting with a letter.
pub fn is_catalog_tool_name(name: &str) -> bool {
    let segments: Vec<&str> = name.split(':').collect();
    segments.len() >= MIN_CATALOG_NAME_SEGMENTS
        && segments.iter().all(|segment| {
            let mut characters = segment.chars();
            characters.next().is_some_and(|first| first.is_ascii_lowercase())
                && characters
                    .all(|character| character.is_ascii_lowercase() || character.is_ascii_digit() || character == '_')
        })
}
