/// The numbers of a version, in order (`10.3.27-ee` → 10, 3, 27).
pub fn version_numbers(version: &str) -> Vec<u64> {
    version
        .split(|character: char| !character.is_ascii_digit())
        .filter(|part| !part.is_empty())
        .map(|part| part.parse().unwrap_or(u64::MAX))
        .collect()
}
