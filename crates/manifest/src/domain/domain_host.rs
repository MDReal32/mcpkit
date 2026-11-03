/// The lowercase host of a domain value: what comes before its path and port.
pub fn domain_host(domain: &str) -> String {
    let host = domain.split('/').next().unwrap_or_default();
    host.split(':').next().unwrap_or_default().to_lowercase()
}
