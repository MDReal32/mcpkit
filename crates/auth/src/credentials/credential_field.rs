use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct CredentialField {
    /// The env var that provides this value without the form.
    pub key: String,
    pub label: String,
    pub hint: String,
    pub placeholder: String,
    pub secret: bool,
}
