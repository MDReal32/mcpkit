/// The UTF-16 offset JavaScript reports for the byte `offset` of `text`.
pub fn to_utf16_offset(text: &str, offset: usize) -> usize {
    text.as_bytes()[..offset.min(text.len())]
        .iter()
        .filter(|byte| **byte & 0xc0 != 0x80)
        .map(|byte| if *byte >= 0xf0 { 2 } else { 1 })
        .sum()
}
