use crate::credentials::CredentialField;
use serde::{Deserialize, Serialize};
use usemcpkit_manifest::Applies;
use usemcpkit_manifest::ui::UiAction;

/// One fallback auth entry the user can fill in.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct CredentialOption {
    /// Index of the entry in the manifest's `auth`.
    pub index: usize,
    pub label: String,
    pub fields: Vec<CredentialField>,
    /// The buttons under the fields: links to create a token, or a CLI to take one from.
    pub actions: Vec<UiAction>,
    /// The sources and versions this option is offered for; every one when absent.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub applies: Option<Applies>,
}
