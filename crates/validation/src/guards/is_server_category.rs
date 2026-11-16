use crate::guards::is_category_name::is_category_name;
use usemcpkit_manifest::ORGANIZATION_CATEGORY_PREFIX;

/// `^(orgs/)?[a-z][a-z0-9-]*$`, the pattern of a server's category: a word, or a word under `orgs/`.
pub fn is_server_category(text: &str) -> bool {
    is_category_name(text.strip_prefix(ORGANIZATION_CATEGORY_PREFIX).unwrap_or(text))
}

#[cfg(test)]
mod tests {
    use super::is_server_category;

    #[test]
    fn accepts_a_word_or_a_word_under_orgs() {
        assert!(is_server_category("git"));
        assert!(is_server_category("orgs/atlassian"));
        assert!(!is_server_category("orgs/"));
        assert!(!is_server_category("orgs/orgs/atlassian"));
        assert!(!is_server_category("teams/atlassian"));
        assert!(!is_server_category("Orgs/atlassian"));
        assert!(!is_server_category("../atlassian"));
    }
}
