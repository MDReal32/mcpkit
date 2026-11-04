use crate::js::js_trim_start;

/// `Number.parseInt(part, 10) || 0`: leading whitespace and a sign are allowed, the digits stop at the first other
/// character, and a part without digits counts as 0.
pub fn parse_version_part(part: &str) -> f64 {
    let trimmed = js_trim_start(part);
    let (sign, unsigned) = match trimmed.strip_prefix('-') {
        Some(rest) => (-1.0, rest),
        None => (1.0, trimmed.strip_prefix('+').unwrap_or(trimmed)),
    };
    let digits_end = unsigned
        .find(|character: char| !character.is_ascii_digit())
        .unwrap_or(unsigned.len());
    let value: f64 = unsigned[..digits_end].parse().unwrap_or(0.0);
    if value == 0.0 {
        return 0.0;
    }
    sign * value
}
