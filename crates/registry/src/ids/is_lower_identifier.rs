/// A lowercase ASCII letter followed by characters `rest` accepts; never empty, never a separator or a dot.
pub fn is_lower_identifier(text: &str, rest: impl Fn(char) -> bool) -> bool {
    let mut characters = text.chars();
    characters.next().is_some_and(|first| first.is_ascii_lowercase()) && characters.all(rest)
}
