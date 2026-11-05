use crate::ui::consts::WEB_HOST_API_PREFIX;

/// `api.github.com` → `github.com`, `api.acme.ghe.com` → `acme.ghe.com`, `ghe.example.com/api/v3` → `ghe.example.com`.
pub fn to_web_host(domain: &str) -> &str {
    match domain.split_once('/') {
        Some((host, _)) => host,
        None => domain.strip_prefix(WEB_HOST_API_PREFIX).unwrap_or(domain),
    }
}

#[cfg(test)]
mod tests {
    use super::to_web_host;

    #[test]
    fn drops_the_api_prefix_or_the_path() {
        assert_eq!(to_web_host("api.github.com"), "github.com");
        assert_eq!(to_web_host("api.acme.ghe.com"), "acme.ghe.com");
        assert_eq!(to_web_host("ghe.example.com/api/v3"), "ghe.example.com");
        assert_eq!(to_web_host("api.example.com/v1"), "api.example.com");
        assert_eq!(to_web_host("gitlab.com"), "gitlab.com");
    }
}
