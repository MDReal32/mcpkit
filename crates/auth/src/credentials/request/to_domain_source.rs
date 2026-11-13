use crate::credentials::DomainSource;
use usemcpkit_manifest::openapi::OpenApiSource;

pub fn to_domain_source(source: &OpenApiSource) -> DomainSource {
    DomainSource {
        name: source.name.clone(),
        label: source.label.clone().unwrap_or_else(|| source.name.clone()),
        hosts: source.hosts.clone(),
        versioned: source.version.is_some(),
    }
}
