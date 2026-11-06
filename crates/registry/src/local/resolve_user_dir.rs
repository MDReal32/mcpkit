use crate::consts::{MANIFESTS_DIR_NAME, REGISTRY_VERSION_DIR};
use crate::registry_error::RegistryError;
use std::path::PathBuf;
use usemcpkit_core::home::{HOME_ENV, resolve_home_dir};

/// `~/.usemcpkit/manifests/v<version>`: each release caches the manifests of its own registry, so a binary never serves
/// what another version downloaded.
pub fn resolve_user_dir() -> Result<PathBuf, RegistryError> {
    resolve_home_dir(std::env::var_os(HOME_ENV))
        .map(|home| home.join(MANIFESTS_DIR_NAME).join(REGISTRY_VERSION_DIR))
        .map_err(RegistryError::Failed)
}
