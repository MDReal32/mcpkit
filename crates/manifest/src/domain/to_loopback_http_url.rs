use crate::domain::consts::{HTTP_PREFIX, HTTPS_PREFIX, LOOPBACK_HOSTS};
use crate::domain::domain_host::domain_host;

/// `https://localhost:5678/api/v1` → `http://localhost:5678/api/v1` when the URL points at `domain` and that domain is
/// a loopback host; any other URL is returned as is.
pub fn to_loopback_http_url(url: String, domain: &str) -> String {
    let host = domain_host(domain);
    if !LOOPBACK_HOSTS.contains(&host.as_str()) {
        return url;
    }
    match url.strip_prefix(HTTPS_PREFIX) {
        Some(rest) if domain_host(rest) == host => format!("{HTTP_PREFIX}{rest}"),
        _ => url,
    }
}

#[cfg(test)]
mod tests {
    use super::to_loopback_http_url;

    #[test]
    fn switches_only_https_urls_of_a_loopback_domain_to_http() {
        for (url, domain, expected) in [
            (
                "https://localhost:5678/api/v1",
                "localhost:5678",
                "http://localhost:5678/api/v1",
            ),
            ("https://127.0.0.1/settings", "127.0.0.1", "http://127.0.0.1/settings"),
            ("https://LocalHost:5678/x", "localhost:5678", "http://LocalHost:5678/x"),
            (
                "https://acme.app.n8n.cloud/api/v1",
                "acme.app.n8n.cloud",
                "https://acme.app.n8n.cloud/api/v1",
            ),
            ("https://docs.n8n.io/api/", "localhost:5678", "https://docs.n8n.io/api/"),
            (
                "https://localhost.example.com/x",
                "localhost.example.com",
                "https://localhost.example.com/x",
            ),
        ] {
            assert_eq!(to_loopback_http_url(url.to_owned(), domain), expected, "{url}");
        }
    }
}
