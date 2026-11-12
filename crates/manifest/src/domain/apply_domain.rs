use crate::auth::AuthSpec;
use crate::domain::apply_auth_domain::apply_auth_domain;
use crate::domain::apply_tool_edition::apply_tool_edition;
use crate::domain::fill_domain_url::fill_domain_url;
use crate::domain::find_edition::find_edition;
use crate::upstream::{HttpUpstream, UpstreamSpec};
use crate::{DomainSpec, Manifest};

/// A copy of the manifest with `{domain}` filled in and each tool set to the domain's edition; without a domain the
/// manifest is returned as is.
pub fn apply_domain(manifest: &Manifest, domain: Option<&str>) -> Manifest {
    let Some(domain) = domain else {
        return manifest.clone();
    };
    let loopback_http = manifest.domain.as_ref().is_some_and(DomainSpec::allows_loopback_http);
    let edition_name = find_edition(manifest.editions.as_ref(), domain);
    let fill_auth = |entries: &Vec<AuthSpec>| -> Vec<AuthSpec> {
        entries
            .iter()
            .map(|auth| apply_auth_domain(auth, domain, loopback_http))
            .collect()
    };
    let upstream = match &manifest.upstream {
        Some(UpstreamSpec::Http(upstream)) => Some(UpstreamSpec::Http(HttpUpstream {
            url: fill_domain_url(&upstream.url, domain, loopback_http),
            auth: upstream.auth.as_ref().map(fill_auth),
            ..upstream.clone()
        })),
        other => other.clone(),
    };
    Manifest {
        base_url: fill_domain_url(&manifest.base_url, domain, loopback_http),
        upstream,
        auth: manifest.auth.as_ref().map(fill_auth),
        tools: manifest
            .tools
            .iter()
            .map(|tool| apply_tool_edition(tool, edition_name))
            .collect(),
        ..manifest.clone()
    }
}
