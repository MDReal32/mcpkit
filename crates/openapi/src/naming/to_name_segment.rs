use crate::consts::DIGIT_SEGMENT_PREFIX;

/// A path segment as a segment of a tool name: lowercase, runs of other characters as `_`, never starting with a
/// digit (`v1` stays, `1.0` becomes `v1_0`); empty when nothing is left.
pub fn to_name_segment(text: &str) -> String {
    let mut segment = String::new();
    let mut pending_separator = false;
    for character in text.chars() {
        if character.is_ascii_alphanumeric() {
            if pending_separator && !segment.is_empty() {
                segment.push('_');
            }
            pending_separator = false;
            segment.push(character.to_ascii_lowercase());
        } else {
            pending_separator = true;
        }
    }
    if segment.starts_with(|first: char| first.is_ascii_digit()) {
        segment.insert_str(0, DIGIT_SEGMENT_PREFIX);
    }
    segment
}
