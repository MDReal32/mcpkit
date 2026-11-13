use crate::openapi::{ConversionOptions, SpecVersioning};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
#[serde(rename_all = "camelCase")]
pub struct OpenApiSource {
    /// Names the source in hand-written tools' `applies`, for example `datacenter`.
    pub name: String,
    /// What the credentials form calls the deployment, for example `Data Center`; the name when absent.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub label: Option<String>,
    /// Host suffixes such as `.atlassian.net`; absent, the source matches any host.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub hosts: Option<Vec<String>>,
    /// The document, absolute or relative to the registry folder; `{version}` is replaced by the version picked.
    pub url: String,
    /// Hex SHA-256 of the document a url without `{version}` must serve.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub sha256: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub version: Option<SpecVersioning>,
    /// Put before every path of the document; the path of the document's first server (or Swagger `basePath`) when
    /// absent.
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub base_path: Option<String>,
    #[serde(default, skip_serializing_if = "Option::is_none")]
    pub options: Option<ConversionOptions>,
}

impl OpenApiSource {
    /// Whether a domain's host ends with one of `hosts`; a source without `hosts` matches every domain.
    pub fn matches_domain(&self, domain: Option<&str>) -> bool {
        let Some(hosts) = &self.hosts else {
            return true;
        };
        let Some(domain) = domain else {
            return false;
        };
        let host = domain.split(['/', ':']).next().unwrap_or(domain).to_ascii_lowercase();
        hosts.iter().any(|suffix| host.ends_with(&suffix.to_ascii_lowercase()))
    }
}
