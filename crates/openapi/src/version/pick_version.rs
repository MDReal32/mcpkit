use crate::version::compare_versions::compare_versions;
use std::cmp::Ordering;

/// The newest of `available` that is not newer than `target`.
pub fn pick_version<'a>(target: &str, available: impl IntoIterator<Item = &'a str>) -> Option<&'a str> {
    available
        .into_iter()
        .filter(|candidate| compare_versions(candidate, target) != Ordering::Greater)
        .max_by(|left, right| compare_versions(left, right))
}
