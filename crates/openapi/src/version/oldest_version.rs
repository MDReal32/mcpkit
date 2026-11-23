use usemcpkit_manifest::condition::compare_versions;

/// The oldest of `available`.
pub fn oldest_version<'a>(available: impl IntoIterator<Item = &'a str>) -> Option<&'a str> {
    available
        .into_iter()
        .min_by(|left, right| compare_versions(left, right))
}

#[cfg(test)]
mod tests {
    use super::oldest_version;

    #[test]
    fn finds_the_oldest_by_number_not_by_text() {
        assert_eq!(oldest_version(["10.0", "9.2", "9.0", "11.1"]), Some("9.0"));
        assert_eq!(oldest_version([]), None);
    }
}
