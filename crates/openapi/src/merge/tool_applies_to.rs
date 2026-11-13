use usemcpkit_manifest::Applies;

/// Whether a hand-written tool applies to the server built from `source` at `version`. A tool without `applies`
/// applies everywhere; a condition on the version applies only to a server whose version is known and meets it.
pub fn tool_applies_to(applies: Option<&Applies>, source: &str, version: Option<&str>) -> bool {
    let Some(applies) = applies else {
        return true;
    };
    if let Some(sources) = &applies.sources
        && !sources.iter().any(|name| name == source)
    {
        return false;
    }
    match &applies.condition {
        None => true,
        Some(condition) => version.is_some_and(|version| condition.matches(version)),
    }
}

#[cfg(test)]
mod tests {
    use super::tool_applies_to;
    use usemcpkit_manifest::Applies;

    #[test]
    fn applies_within_its_sources_and_versions() {
        let applies = Applies {
            sources: Some(vec!["datacenter".into()]),
            condition: Some("9.0 <= {version} < 10.4".to_owned().try_into().unwrap()),
        };
        assert!(tool_applies_to(None, "cloud", None));
        assert!(tool_applies_to(Some(&applies), "datacenter", Some("10.3.5")));
        assert!(tool_applies_to(Some(&applies), "datacenter", Some("9.0")));
        assert!(!tool_applies_to(Some(&applies), "datacenter", Some("10.4")));
        assert!(!tool_applies_to(Some(&applies), "datacenter", Some("8.20")));
        assert!(!tool_applies_to(Some(&applies), "cloud", Some("10.0")));
        assert!(!tool_applies_to(Some(&applies), "datacenter", None));
    }
}
