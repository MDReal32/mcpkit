use crate::credentials::DomainField;
use crate::credentials::request::to_domain_source::to_domain_source;
use indexmap::IndexMap;
use usemcpkit_core::env::Env;
use usemcpkit_manifest::Manifest;

/// A domain set through its env var is not offered for editing.
pub fn build_domain_field(
    manifest: &Manifest,
    domain: Option<&str>,
    known_hosts: Vec<String>,
    env: &Env,
    texts: &IndexMap<String, String>,
) -> Option<DomainField> {
    let spec = manifest.domain.as_ref()?;
    if spec.env.as_deref().and_then(|name| env.get_non_empty(name)).is_some() {
        return None;
    }
    let text = |key: &str| texts.get(key).cloned().unwrap_or_default();
    Some(DomainField {
        label: spec.label.clone().unwrap_or_else(|| text("domainLabel")),
        hint: spec.hint.clone().unwrap_or_else(|| text("domainHint")),
        placeholder: spec.placeholder.clone().unwrap_or_else(|| text("domainPlaceholder")),
        value: domain.unwrap_or_default().to_owned(),
        known_hosts,
        suggested_hosts: spec.suggested_hosts.clone().unwrap_or_default(),
        check: spec.offers_check(),
        sources: manifest
            .openapi
            .iter()
            .flat_map(|openapi| openapi.sources.iter().map(to_domain_source))
            .collect(),
    })
}
