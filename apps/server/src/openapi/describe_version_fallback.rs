use crate::openapi::host_record::HostRecord;

/// A warning for each source whose tools were built from the document of an older version than the server runs, or
/// that has no document for its version and serves only its hand-written tools.
pub fn describe_version_fallback(server_id: &str, record: &HostRecord) -> Vec<String> {
    record
        .sources
        .iter()
        .filter_map(|source| {
            let version = source.version.as_ref()?;
            match &source.spec_version {
                None => Some(format!(
                    "{server_id}: no OpenAPI document of {} is published for {version} or older; only its hand-written tools are served",
                    source.source
                )),
                Some(spec_version) if spec_version != version => Some(format!(
                    "{server_id}: no OpenAPI document of {} is published for {version}; its tools come from the one of {spec_version}",
                    source.source
                )),
                Some(_) => None,
            }
        })
        .collect()
}
