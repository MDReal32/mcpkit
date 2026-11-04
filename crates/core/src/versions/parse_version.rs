use crate::versions::parse_version_part::parse_version_part;

/// The numeric parts of a dotted version, each read like JavaScript's `Number.parseInt(part, 10) || 0`.
pub fn parse_version(version: &str) -> Vec<f64> {
    version.split('.').map(parse_version_part).collect()
}
