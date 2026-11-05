use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct DomainField {
    pub label: String,
    pub hint: String,
    pub placeholder: String,
    /// The domain in use, prefilled in the form; empty when there is none yet.
    pub value: String,
    /// Hosts already used with this server, offered for picking; the user can still type a new one.
    pub known_hosts: Vec<String>,
}
