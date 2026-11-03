use crate::consts::{LEGACY_SERVER_CATEGORIES, UNKNOWN_CATEGORY};

/// 3 → 4: the category a server saved before categories existed belongs to.
pub fn to_legacy_category(name: &str) -> &'static str {
    LEGACY_SERVER_CATEGORIES
        .iter()
        .find(|(server, _)| *server == name)
        .map_or(UNKNOWN_CATEGORY, |(_, category)| category)
}
