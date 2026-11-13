use regex::Regex;

/// A regular expression the server compiles with the `regex` crate, so the error text is that crate's; with
/// `captures`, it must also capture what it reads.
pub fn validate_pattern(pattern: Option<&str>, location: &str, captures: bool) -> Option<String> {
    let Some(pattern) = pattern.filter(|pattern| !pattern.is_empty()) else {
        return Some(format!("{location} must be a regular expression"));
    };
    match Regex::new(pattern) {
        Err(error) => Some(format!("{location} is not a valid regular expression: {error}")),
        Ok(regex) if captures && regex.captures_len() < 2 => {
            Some(format!("{location} must capture the version with ( )"))
        }
        Ok(_) => None,
    }
}
