use crate::version::compare_versions;
use std::cmp::Ordering;
use usemcpkit_manifest::Applies;

/// Whether a hand-written tool applies to the server built from `source` at `version`. A tool without `applies`
/// applies everywhere; a version range applies only to a server whose version is known and in it.
pub fn tool_applies_to(applies: Option<&Applies>, source: &str, version: Option<&str>) -> bool {
    let Some(applies) = applies else {
        return true;
    };
    if let Some(sources) = &applies.sources
        && !sources.iter().any(|name| name == source)
    {
        return false;
    }
    if applies.from.is_none() && applies.below.is_none() {
        return true;
    }
    let Some(version) = version else {
        return false;
    };
    let from_ok = applies
        .from
        .as_deref()
        .is_none_or(|from| compare_versions(version, from) != Ordering::Less);
    let below_ok = applies
        .below
        .as_deref()
        .is_none_or(|below| compare_versions(version, below) == Ordering::Less);
    from_ok && below_ok
}

#[cfg(test)]
mod tests {
    use super::tool_applies_to;
    use usemcpkit_manifest::Applies;

    #[test]
    fn applies_within_its_sources_and_range() {
        let applies = Applies {
            sources: Some(vec!["datacenter".into()]),
            from: Some("9.0".into()),
            below: Some("10.4".into()),
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
