/// A non-empty text whose first character passes `first` and every other one `rest`, the shape of the name patterns
/// (`^[a-z][a-z0-9_]*$` and the like) without a regular expression.
pub fn is_word(text: &str, first: fn(char) -> bool, rest: fn(char) -> bool) -> bool {
    let mut characters = text.chars();
    characters.next().is_some_and(first) && characters.all(rest)
}
