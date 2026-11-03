use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct ManifestPart {
    /// First segment of the tool names the part holds, for example `issues`.
    pub name: String,
    /// Link to the part file, absolute or relative to the registry URL, like the index `url`.
    pub url: String,
    /// Hex SHA-256 of the part file.
    pub sha256: String,
}
