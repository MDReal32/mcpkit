use crate::mcp::consts::{PATH_SEPARATOR, TOOL_ID_SEPARATOR};

/// The group every tool starting with `prefix` belongs to (see `first_name_segment`), once the prefix holds that
/// group in full, so only its part of a split server is downloaded; `None` while the first segment may still go on.
pub fn prefix_group(prefix: &str) -> Option<&str> {
    let end = prefix.find([TOOL_ID_SEPARATOR, PATH_SEPARATOR])?;
    if end == 0 {
        return None;
    }
    Some(&prefix[..end])
}

#[cfg(test)]
mod tests {
    use super::prefix_group;

    #[test]
    fn names_the_group_once_its_segment_is_complete() {
        assert_eq!(prefix_group("api/v4/web_commits"), Some("api"));
        assert_eq!(prefix_group("issues:"), Some("issues"));
    }

    #[test]
    fn names_no_group_while_the_first_segment_may_go_on() {
        assert_eq!(prefix_group("ap"), None);
        assert_eq!(prefix_group(""), None);
        assert_eq!(prefix_group("/api"), None);
    }
}
