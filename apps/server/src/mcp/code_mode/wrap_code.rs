use crate::mcp::code_mode::consts::{CODE_PLACEHOLDER, WRAPPER};

/// Puts the model's function into the wrapper, in parentheses on lines of their own so a `//` comment on its last line
/// cannot swallow the closing one; a trailing `;` would end the expression it is part of, so it goes.
pub fn wrap_code(code: &str) -> String {
    let function = code.trim().trim_end_matches(';').trim_end();
    WRAPPER.replacen(CODE_PLACEHOLDER, &format!("(\n{function}\n)"), 1)
}

#[cfg(test)]
mod tests {
    use super::wrap_code;

    #[test]
    fn drops_the_trailing_semicolon_and_keeps_line_comments_on_their_own_line() {
        let wrapped = wrap_code("  async () => 1 // one\n;\n");
        assert!(wrapped.contains("\nasync () => 1 // one\n"));
        assert!(!wrapped.contains("__USEMCPKIT_CODE__"));
    }
}
