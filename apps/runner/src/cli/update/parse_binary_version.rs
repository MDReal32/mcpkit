use mcpkit_core::js::js_trim;

/// The version in `mcpkit --version` output: the last word, since this runner prints `mcpkit 0.9.0` and the
/// TypeScript binaries printed a bare `0.8.4`.
pub fn parse_binary_version(output: &str) -> Option<&str> {
    js_trim(output).split_whitespace().last()
}

#[cfg(test)]
mod tests {
    use super::parse_binary_version;

    #[test]
    fn reads_the_version_printed_by_either_binary() {
        assert_eq!(parse_binary_version("mcpkit 0.9.0\n"), Some("0.9.0"));
        assert_eq!(parse_binary_version("0.8.4\r\n"), Some("0.8.4"));
        assert_eq!(parse_binary_version("  \n"), None);
    }
}
