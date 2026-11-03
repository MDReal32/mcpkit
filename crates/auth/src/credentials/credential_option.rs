use crate::credentials::CredentialField;
use mcpkit_manifest::ui::UiAction;
use serde::{Deserialize, Serialize};

/// One fallback auth entry the user can fill in.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct CredentialOption {
    /// Index of the entry in the manifest's `auth`.
    pub index: usize,
    pub label: String,
    pub fields: Vec<CredentialField>,
    /// The buttons under the fields: links to create a token, or a CLI to take one from.
    pub actions: Vec<UiAction>,
}
