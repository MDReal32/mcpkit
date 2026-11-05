use crate::ui::to_web_host::to_web_host;
use usemcpkit_manifest::domain::to_loopback_http_url;
use usemcpkit_manifest::ui::{UI_DOMAIN_PLACEHOLDERS, fill_template, read_placeholders};

/// `None` while the link needs a domain and there is none yet; with `loopback_http` a link to a loopback domain opens
/// over `http://`.
pub fn resolve_link_url(url: &str, domain: Option<&str>, loopback_http: bool) -> Option<String> {
    let domain = domain.filter(|domain| !domain.is_empty());
    let needs_domain = read_placeholders(url)
        .iter()
        .any(|name| UI_DOMAIN_PLACEHOLDERS.contains(name));
    if needs_domain && domain.is_none() {
        return None;
    }
    let values = [
        ("domain", domain.unwrap_or_default()),
        ("webHost", domain.map(to_web_host).unwrap_or_default()),
    ];
    let filled = fill_template(url, &values);
    Some(match domain {
        Some(domain) if loopback_http => to_loopback_http_url(filled, domain),
        _ => filled,
    })
}

#[cfg(test)]
mod tests {
    use super::resolve_link_url;

    #[test]
    fn uses_the_domain_as_typed_or_its_web_host_and_waits_for_one_only_when_needed() {
        assert_eq!(
            resolve_link_url("https://{webHost}/settings/tokens", Some("api.github.com"), false).as_deref(),
            Some("https://github.com/settings/tokens")
        );
        assert_eq!(
            resolve_link_url("https://{domain}/-/profile", Some("git.example.com/gitlab"), false).as_deref(),
            Some("https://git.example.com/gitlab/-/profile")
        );
        assert_eq!(resolve_link_url("https://{domain}/x", None, false), None);
        assert_eq!(
            resolve_link_url("https://example.com/{server}", None, false).as_deref(),
            Some("https://example.com/{server}")
        );
    }

    #[test]
    fn opens_a_loopback_domain_over_http_only_when_the_server_allows_it() {
        assert_eq!(
            resolve_link_url("https://{domain}/settings/api", Some("localhost:5678"), true).as_deref(),
            Some("http://localhost:5678/settings/api")
        );
        assert_eq!(
            resolve_link_url("https://{domain}/settings/api", Some("localhost:5678"), false).as_deref(),
            Some("https://localhost:5678/settings/api")
        );
    }
}
