use serde::Serialize;

/// What the Check button found: the source the host belongs to and the version its server runs.
#[derive(Clone, Debug, PartialEq, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct HostCheckResult {
    pub source: String,
    pub label: String,
    /// Absent for a source without versions.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub version: Option<String>,
}
