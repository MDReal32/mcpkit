use crate::openapi::consts::ANY_HOST_KEY;

/// The `hosts.json` key of a domain: the domain itself, or `*` for a server without one.
pub fn to_host_key(domain: Option<&str>) -> &str {
    domain.unwrap_or(ANY_HOST_KEY)
}
