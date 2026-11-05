use std::ops::Range;

/// Every `{name}` in the template, like core's `/\{(\w+)\}/g`: the span of the whole placeholder and its name, where a
/// name is ASCII letters, digits and `_`.
pub fn find_placeholders(template: &str) -> Vec<(Range<usize>, &str)> {
    let bytes = template.as_bytes();
    let mut found = Vec::new();
    let mut start = 0;
    while let Some(offset) = template[start..].find('{') {
        let open = start + offset;
        let name_end = bytes[open + 1..]
            .iter()
            .position(|byte| !(byte.is_ascii_alphanumeric() || *byte == b'_'))
            .map_or(bytes.len(), |length| open + 1 + length);
        if name_end > open + 1 && bytes.get(name_end) == Some(&b'}') {
            found.push((open..name_end + 1, &template[open + 1..name_end]));
            start = name_end + 1;
        } else {
            start = open + 1;
        }
    }
    found
}

#[cfg(test)]
mod tests {
    use super::find_placeholders;

    #[test]
    fn finds_word_placeholders_only() {
        let names = |template| {
            find_placeholders(template)
                .into_iter()
                .map(|(_, name)| name)
                .collect::<Vec<_>>()
        };

        assert_eq!(names("{a}/{b_2}?{}&{c d}{{e}}é{f}"), ["a", "b_2", "e", "f"]);
        assert_eq!(find_placeholders("x{server}")[0].0, 1..9);
        assert!(names("{unclosed").is_empty());
    }
}
