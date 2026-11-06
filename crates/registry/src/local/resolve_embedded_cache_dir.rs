use crate::consts::{EMBEDDED_CACHE_DIR_PREFIX, EMBEDDED_CACHE_HASH_LENGTH, MANIFESTS_DIR_NAME};
use crate::registry_error::RegistryError;
use crate::remote::EmbeddedRegistry;
use std::path::PathBuf;
use usemcpkit_core::hash::sha256_hex;
use usemcpkit_core::home::{HOME_ENV, resolve_home_dir};

/// `~/.usemcpkit/manifests/dev-<hash of the embedded index>`: a rebuilt dev binary with other manifests gets a cache of
/// its own instead of serving what an older build cached.
pub fn resolve_embedded_cache_dir(registry: &EmbeddedRegistry) -> Result<PathBuf, RegistryError> {
    let hash = sha256_hex(registry.index_text()?);
    let dir_name = format!("{EMBEDDED_CACHE_DIR_PREFIX}{}", &hash[..EMBEDDED_CACHE_HASH_LENGTH]);
    resolve_home_dir(std::env::var_os(HOME_ENV))
        .map(|home| home.join(MANIFESTS_DIR_NAME).join(dir_name))
        .map_err(RegistryError::Failed)
}
