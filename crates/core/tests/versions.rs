use mcpkit_core::versions::{compare_versions, parse_version};
use std::cmp::Ordering;

#[test]
fn reads_each_part_like_parse_int() {
    assert_eq!(parse_version("1.2.3"), [1.0, 2.0, 3.0]);
    assert_eq!(parse_version(" 2.10-beta.x"), [2.0, 10.0, 0.0]);
    assert_eq!(parse_version("-0.+4"), [0.0, 4.0]);
}

#[test]
fn orders_versions_part_by_part_with_missing_parts_as_zero() {
    assert_eq!(compare_versions("0.10.0", "0.9.9"), Ordering::Greater);
    assert_eq!(compare_versions("1.0", "1.0.0"), Ordering::Equal);
    assert_eq!(compare_versions("1.0.0", "1.0.1"), Ordering::Less);
}
