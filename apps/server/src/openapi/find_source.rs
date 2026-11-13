use usemcpkit_manifest::openapi::OpenApiSource;

/// The first source whose hosts match the domain.
pub fn find_source<'a>(sources: &'a [OpenApiSource], domain: Option<&str>) -> Result<&'a OpenApiSource, String> {
    sources
        .iter()
        .find(|source| source.matches_domain(domain))
        .ok_or_else(|| match domain {
            Some(domain) => format!("no OpenAPI source matches the host {domain}"),
            None => "no OpenAPI source matches a server without a host".to_owned(),
        })
}
