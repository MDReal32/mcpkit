use crate::openapi::source_record::SourceRecord;
use serde::{Deserialize, Serialize};

/// What `hosts.json` keeps for one host: the sources matching it, in order, and when their versions were asked.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HostRecord {
    pub sources: Vec<SourceRecord>,
    /// When the versions were last asked, as an RFC 3339 time in UTC with milliseconds.
    pub checked_at: String,
}
