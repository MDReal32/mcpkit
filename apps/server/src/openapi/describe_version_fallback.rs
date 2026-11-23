use crate::openapi::host_record::HostRecord;

/// A warning for each source whose tools were built from the document of an older version than the server runs, from
/// the oldest document because the server's version could not be read, or that has no document for its version and
/// serves only its hand-written tools.
pub fn describe_version_fallback(server_id: &str, record: &HostRecord) -> Vec<String> {
    record
        .sources
        .iter()
        .filter_map(|source| match (&source.version, &source.spec_version) {
            (None, None) => None,
            (None, Some(spec_version)) => Some(format!(
                "{server_id}: the version of the {} server could not be read; its tools come from the oldest OpenAPI document, the one of {spec_version}",
                source.source
            )),
            (Some(version), None) => Some(format!(
                "{server_id}: no OpenAPI document of {} is published for {version} or older; only its hand-written tools are served",
                source.source
            )),
            (Some(version), Some(spec_version)) if spec_version != version => Some(format!(
                "{server_id}: no OpenAPI document of {} is published for {version}; its tools come from the one of {spec_version}",
                source.source
            )),
            (Some(_), Some(_)) => None,
        })
        .collect()
}
