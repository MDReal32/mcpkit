use crate::openapi::host_record::HostRecord;

/// A warning for each source whose tools were built from the document of an older version than the server runs.
pub fn describe_version_fallback(server_id: &str, record: &HostRecord) -> Vec<String> {
    record
        .sources
        .iter()
        .filter_map(|source| {
            let (Some(version), Some(spec_version)) = (&source.version, &source.spec_version) else {
                return None;
            };
            (version != spec_version).then(|| {
                format!(
                    "{server_id}: no OpenAPI document of {} is published for {version}; its tools come from the one of {spec_version}",
                    source.source
                )
            })
        })
        .collect()
}
