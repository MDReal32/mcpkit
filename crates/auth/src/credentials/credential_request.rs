use crate::credentials::{CredentialOption, DomainField};
use indexmap::IndexMap;
use serde::{Deserialize, Serialize};
use std::sync::Arc;
use usemcpkit_manifest::Manifest;

/// Everything the credentials page shows, so the page itself holds no text. Its JSON is what the Svelte page reads.
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct CredentialRequest {
    pub server_name: String,
    pub texts: IndexMap<String, String>,
    /// Present when the user may choose the domain.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub domain: Option<DomainField>,
    /// The domain in use when the form opened; the form's own domain field wins when it has one.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub domain_in_use: Option<String>,
    /// Links to a `localhost` or `127.0.0.1` domain open over `http://` (the manifest's `domain.loopbackHttp`).
    #[serde(default, skip_serializing_if = "std::ops::Not::not")]
    pub loopback_http: bool,
    pub options: Vec<CredentialOption>,
    /// Whether the server offers an OAuth2 browser sign-in.
    pub sign_in: bool,
    /// The manifest the form asks for, which the Check button probes with; kept in the process, never sent to the
    /// page.
    #[serde(skip)]
    pub manifest: Option<Arc<Manifest>>,
}

impl CredentialRequest {
    /// A page text by its `UiTexts` key; every key of the defaults is always there.
    pub fn text(&self, key: &str) -> &str {
        self.texts.get(key).map_or("", String::as_str)
    }
}
