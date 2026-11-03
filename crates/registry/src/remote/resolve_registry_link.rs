use crate::registry_error::RegistryError;
use url::Url;

/// `link` read against the registry folder, like `new URL(link, registryUrl + "/")`: absolute links stay as they are.
pub fn resolve_registry_link(registry_url: &str, link: &str) -> Result<String, RegistryError> {
    let base = format!("{}/", registry_url.strip_suffix('/').unwrap_or(registry_url));
    Url::parse(&base)
        .and_then(|base| base.join(link))
        .map(String::from)
        .map_err(|error| RegistryError::failed(format!("invalid registry link {link} under {registry_url}: {error}")))
}

#[cfg(test)]
mod tests {
    use super::resolve_registry_link;

    #[test]
    fn resolves_relative_and_keeps_absolute_links() {
        let registry = "https://example.com/mcpkit";
        assert_eq!(
            resolve_registry_link(registry, "git/github.json"),
            Ok("https://example.com/mcpkit/git/github.json".into())
        );
        assert_eq!(
            resolve_registry_link("https://example.com/mcpkit/", "index.json"),
            Ok("https://example.com/mcpkit/index.json".into())
        );
        assert_eq!(
            resolve_registry_link(registry, "https://cdn.example.com/a.json"),
            Ok("https://cdn.example.com/a.json".into())
        );
    }
}
