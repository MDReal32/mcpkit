use crate::mcp::code_mode::consts::{MAX_OUTPUT_CHARS, TRUNCATED_MARKER};

/// Keeps the first [`MAX_OUTPUT_CHARS`] characters and says how much was cut, so the model can ask for less.
pub fn truncate_output(text: String) -> String {
    let length = text.chars().count();
    if length <= MAX_OUTPUT_CHARS {
        return text;
    }
    let kept: String = text.chars().take(MAX_OUTPUT_CHARS).collect();
    format!(
        "{kept}\n{TRUNCATED_MARKER}\nThe output was {length} characters; return less, for example by filtering or picking fields in the code."
    )
}

#[cfg(test)]
mod tests {
    use super::truncate_output;
    use crate::mcp::code_mode::consts::{MAX_OUTPUT_CHARS, TRUNCATED_MARKER};

    #[test]
    fn cuts_only_long_output() {
        assert_eq!(truncate_output("short".to_owned()), "short");
        let long = "é".repeat(MAX_OUTPUT_CHARS + 10);
        let cut = truncate_output(long);
        assert!(cut.starts_with(&"é".repeat(MAX_OUTPUT_CHARS)));
        assert!(cut.contains(TRUNCATED_MARKER));
    }
}
