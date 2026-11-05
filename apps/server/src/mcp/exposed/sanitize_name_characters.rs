/// Replaces what a tool name may not hold with `_`, one per UTF-16 unit like the CLI's regular expression, so a
/// character outside the Basic Multilingual Plane becomes `__` there and here.
pub fn sanitize_name_characters(name: &str) -> String {
    name.chars()
        .flat_map(|character| {
            let allowed = character.is_ascii_alphanumeric() || character == '_' || character == '-';
            let replaced = if allowed { 0 } else { character.len_utf16() };
            std::iter::once(character)
                .filter(move |_| allowed)
                .chain(std::iter::repeat_n('_', replaced))
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use super::sanitize_name_characters;

    #[test]
    fn replaces_each_utf16_unit() {
        assert_eq!(sanitize_name_characters("a.b-c_d"), "a_b-c_d");
        assert_eq!(sanitize_name_characters("é😀"), "___");
    }
}
