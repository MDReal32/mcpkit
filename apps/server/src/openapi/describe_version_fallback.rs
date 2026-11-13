use crate::openapi::host_record::HostRecord;

/// The warning for tools built from the document of an older version than the server runs.
pub fn describe_version_fallback(server_id: &str, record: &HostRecord) -> Option<String> {
    let (Some(version), Some(spec_version)) = (&record.version, &record.spec_version) else {
        return None;
    };
    (version != spec_version).then(|| {
        format!(
            "{server_id}: no OpenAPI document of {} is published for {version}; its tools come from the one of {spec_version}",
            record.source
        )
    })
}
