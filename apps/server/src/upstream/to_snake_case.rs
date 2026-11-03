/// Like the TypeScript CLI: a lowercase letter or digit followed by a capital gets an `_` between them, everything is
/// lowercased, each run of other characters becomes one `_`, and `_` at either end is dropped.
pub fn to_snake_case(name: &str) -> String {
    let characters: Vec<char> = name.chars().collect();
    let mut split = String::new();
    let mut index = 0;
    while index < characters.len() {
        let current = characters[index];
        let lower = current.is_ascii_lowercase() || current.is_ascii_digit();
        match characters.get(index + 1) {
            Some(&capital) if lower && capital.is_ascii_uppercase() => {
                split.push(current);
                split.push('_');
                split.push(capital);
                index += 2;
            }
            _ => {
                split.push(current);
                index += 1;
            }
        }
    }
    let mut snake = String::new();
    let mut in_separator_run = false;
    for character in split.to_lowercase().chars() {
        let kept = character.is_ascii_lowercase() || character.is_ascii_digit();
        if kept {
            snake.push(character);
        } else if !in_separator_run {
            snake.push('_');
        }
        in_separator_run = !kept;
    }
    snake.trim_matches('_').to_owned()
}
