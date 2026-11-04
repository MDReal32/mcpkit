use crate::consts::{DEFAULT_REGISTRY_URL, REGISTRY_ENV};

/// The flag, then `USEMCPKIT_REGISTRY`, then the published registry; an empty value counts as unset.
pub fn resolve_registry_url(flag: Option<&str>) -> String {
    let from_env = std::env::var(REGISTRY_ENV).ok();
    [flag, from_env.as_deref()]
        .into_iter()
        .flatten()
        .find(|value| !value.is_empty())
        .unwrap_or(DEFAULT_REGISTRY_URL)
        .to_owned()
}
