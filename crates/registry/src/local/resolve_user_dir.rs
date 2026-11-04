use crate::consts::MANIFESTS_DIR_NAME;
use crate::registry_error::RegistryError;
use std::path::PathBuf;
use usemcpkit_core::home::{HOME_ENV, resolve_home_dir};

pub fn resolve_user_dir() -> Result<PathBuf, RegistryError> {
    resolve_home_dir(std::env::var_os(HOME_ENV))
        .map(|home| home.join(MANIFESTS_DIR_NAME))
        .map_err(RegistryError::Failed)
}
