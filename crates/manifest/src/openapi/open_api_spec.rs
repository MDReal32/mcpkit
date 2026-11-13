use crate::openapi::OpenApiSource;
use serde::{Deserialize, Serialize};

/// Tools built on the user's machine from OpenAPI (or Swagger 2.0) documents, for the version the user's server runs.
/// A tool is named after its endpoint, `<path>:<method>` (`repos/{owner}/{repo}/branches:get`).
#[derive(Clone, Debug, PartialEq, Deserialize, Serialize)]
pub struct OpenApiSpec {
    /// The documents of each deployment: every source whose `hosts` match the domain is used, their tools merged in
    /// order; when none does, every source without `hosts`.
    pub sources: Vec<OpenApiSource>,
}

impl OpenApiSpec {
    /// The sources of a domain, in order: the ones whose `hosts` match it, else the ones without `hosts`.
    pub fn sources_for(&self, domain: Option<&str>) -> Vec<&OpenApiSource> {
        let hosted: Vec<&OpenApiSource> = self
            .sources
            .iter()
            .filter(|source| source.hosts.is_some() && source.matches_domain(domain))
            .collect();
        if !hosted.is_empty() {
            return hosted;
        }
        self.sources.iter().filter(|source| source.hosts.is_none()).collect()
    }

    /// The source whose probe asks a domain's server its version: the first of [`Self::sources_for`] with versions,
    /// else the first.
    pub fn primary_source(&self, domain: Option<&str>) -> Option<&OpenApiSource> {
        let sources = self.sources_for(domain);
        sources
            .iter()
            .find(|source| source.version.is_some())
            .or_else(|| sources.first())
            .copied()
    }
}
