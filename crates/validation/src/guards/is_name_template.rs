use crate::guards::consts::MIN_NAME_TEMPLATE_SEGMENTS;

/// `^[a-z0-9_$&]+(:[a-z0-9_$&]+){2,}$`: the `name` of an upstream naming rule.
pub fn is_name_template(text: &str) -> bool {
    let segments: Vec<&str> = text.split(':').collect();
    segments.len() >= MIN_NAME_TEMPLATE_SEGMENTS
        && segments.iter().all(|segment| {
            !segment.is_empty()
                && segment.chars().all(|character| {
                    character.is_ascii_lowercase() || character.is_ascii_digit() || "_$&".contains(character)
                })
        })
}
