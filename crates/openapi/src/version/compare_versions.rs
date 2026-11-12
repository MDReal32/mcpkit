use crate::version::version_numbers::version_numbers;
use std::cmp::Ordering;

/// Compares versions by their numbers (`3.9` < `3.14`, `10.3.27` > `10.3`); a missing number counts as 0.
pub fn compare_versions(left: &str, right: &str) -> Ordering {
    let (left, right) = (version_numbers(left), version_numbers(right));
    let length = left.len().max(right.len());
    (0..length)
        .map(|index| {
            let left = left.get(index).copied().unwrap_or(0);
            let right = right.get(index).copied().unwrap_or(0);
            left.cmp(&right)
        })
        .find(|ordering| ordering.is_ne())
        .unwrap_or(Ordering::Equal)
}
