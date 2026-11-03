use crate::Manifest;
use crate::domain::apply_auth_domain::apply_auth_domain;
use crate::domain::apply_tool_edition::apply_tool_edition;
use crate::domain::fill_domain::fill_domain;
use crate::domain::find_edition::find_edition;
use crate::upstream::{HttpUpstream, UpstreamSpec};

/// A copy of the manifest with `{domain}` filled in and each tool set to the domain's edition; without a domain the
/// manifest is returned as is.
pub fn apply_domain(manifest: &Manifest, domain: Option<&str>) -> Manifest {
    let Some(domain) = domain else {
        return manifest.clone();
    };
    let edition_name = find_edition(manifest.editions.as_ref(), domain);
    let upstream = match &manifest.upstream {
        Some(UpstreamSpec::Http(upstream)) => Some(UpstreamSpec::Http(HttpUpstream {
            url: fill_domain(&upstream.url, domain),
            ..upstream.clone()
        })),
        other => other.clone(),
    };
    Manifest {
        base_url: fill_domain(&manifest.base_url, domain),
        upstream,
        auth: manifest
            .auth
            .as_ref()
            .map(|entries| entries.iter().map(|auth| apply_auth_domain(auth, domain)).collect()),
        tools: manifest
            .tools
            .iter()
            .map(|tool| apply_tool_edition(tool, edition_name))
            .collect(),
        ..manifest.clone()
    }
}
