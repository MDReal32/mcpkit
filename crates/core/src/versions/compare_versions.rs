use crate::versions::parse_version::parse_version;
use std::cmp::Ordering;

/// Orders two dotted versions part by part, a missing part counting as 0, like the TypeScript `compareVersions`.
pub fn compare_versions(left: &str, right: &str) -> Ordering {
    let left_parts = parse_version(left);
    let right_parts = parse_version(right);
    let length = left_parts.len().max(right_parts.len());
    for index in 0..length {
        let left_part = left_parts.get(index).copied().unwrap_or(0.0);
        let right_part = right_parts.get(index).copied().unwrap_or(0.0);
        let ordering = left_part.total_cmp(&right_part);
        if ordering != Ordering::Equal {
            return ordering;
        }
    }
    Ordering::Equal
}
