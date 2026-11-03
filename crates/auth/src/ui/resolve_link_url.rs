use crate::ui::to_web_host::to_web_host;
use mcpkit_manifest::ui::{UI_DOMAIN_PLACEHOLDERS, fill_template, read_placeholders};

/// `None` while the link needs a domain and there is none yet.
pub fn resolve_link_url(url: &str, domain: Option<&str>) -> Option<String> {
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
    Some(fill_template(url, &values))
}

#[cfg(test)]
mod tests {
    use super::resolve_link_url;

    #[test]
    fn uses_the_domain_as_typed_or_its_web_host_and_waits_for_one_only_when_needed() {
        assert_eq!(
            resolve_link_url("https://{webHost}/settings/tokens", Some("api.github.com")).as_deref(),
            Some("https://github.com/settings/tokens")
        );
        assert_eq!(
            resolve_link_url("https://{domain}/-/profile", Some("git.example.com/gitlab")).as_deref(),
            Some("https://git.example.com/gitlab/-/profile")
        );
        assert_eq!(resolve_link_url("https://{domain}/x", None), None);
        assert_eq!(
            resolve_link_url("https://example.com/{server}", None).as_deref(),
            Some("https://example.com/{server}")
        );
    }
}
