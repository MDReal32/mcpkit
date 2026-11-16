use crate::ids::is_lower_identifier::is_lower_identifier;
use usemcpkit_manifest::ORGANIZATION_CATEGORY_PREFIX;

/// `^(orgs/)?[a-z][a-z0-9-]*$`: a word, or a word under `orgs/`; no other separator, dot or empty part.
pub fn is_category_identifier(text: &str) -> bool {
    is_lower_identifier(
        text.strip_prefix(ORGANIZATION_CATEGORY_PREFIX).unwrap_or(text),
        |character| character.is_ascii_lowercase() || character.is_ascii_digit() || character == '-',
    )
}
