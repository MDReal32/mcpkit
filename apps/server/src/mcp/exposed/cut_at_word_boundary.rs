use crate::mcp::exposed::consts::NAME_PART_SEPARATOR;

/// `name` is ASCII by now. It is cut to `length`, back to the last separator when that keeps more than half of it.
pub fn cut_at_word_boundary(name: &str, length: usize) -> &str {
    let cut = &name[..length.min(name.len())];
    let kept = match cut.rfind(NAME_PART_SEPARATOR) {
        Some(boundary) if boundary * 2 > length => &cut[..boundary],
        _ => cut,
    };
    kept.trim_end_matches(NAME_PART_SEPARATOR)
}
