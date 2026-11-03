use crate::upstream::consts::LEADING_LETTER_PREFIX;
use crate::upstream::to_snake_case::to_snake_case;

/// The snake-case name, with `t_` in front when it does not start with a letter.
pub fn to_segment(name: &str) -> String {
    let snake = to_snake_case(name);
    match snake.starts_with(|character: char| character.is_ascii_lowercase()) {
        true => snake,
        false => format!("{LEADING_LETTER_PREFIX}{snake}"),
    }
}
