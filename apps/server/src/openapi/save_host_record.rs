use crate::openapi::consts::HOSTS_FILE_NAME;
use crate::openapi::host_record::HostRecord;
use crate::openapi::read_json_file::read_json_file;
use crate::openapi::to_host_key::to_host_key;
use crate::openapi::write_json_file::write_json_file;
use indexmap::IndexMap;
use std::path::Path;

/// Puts the host's record into `hosts.json`, keeping the other hosts'.
pub async fn save_host_record(dir: &Path, domain: Option<&str>, record: &HostRecord) -> Result<(), String> {
    let file = dir.join(HOSTS_FILE_NAME);
    let mut records: IndexMap<String, HostRecord> = read_json_file(&file).await?.unwrap_or_default();
    records.insert(to_host_key(domain).to_owned(), record.clone());
    write_json_file(&file, &records).await
}
