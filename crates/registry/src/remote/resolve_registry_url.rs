use crate::consts::{DEFAULT_REGISTRY_URL, REGISTRY_ENV, REGISTRY_VERSION_DIR};

/// The flag, then `USEMCPKIT_REGISTRY`, then the folder of the published registry for this version; an empty value
/// counts as unset. A flag or `USEMCPKIT_REGISTRY` names the registry folder itself, with no version added.
pub fn resolve_registry_url(flag: Option<&str>) -> String {
    let from_env = std::env::var(REGISTRY_ENV).ok();
    [flag, from_env.as_deref()]
        .into_iter()
        .flatten()
        .find(|value| !value.is_empty())
        .map_or_else(
            || format!("{DEFAULT_REGISTRY_URL}/{REGISTRY_VERSION_DIR}"),
            str::to_owned,
        )
}
