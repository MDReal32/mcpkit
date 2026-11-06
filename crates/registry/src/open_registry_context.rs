use crate::consts::EMBEDDED_REGISTRY_URL;
use crate::local::resolve_embedded_cache_dir;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::registry_source::RegistrySource;
use crate::remote::{HttpFetcher, RegistryFetcher};

/// The published source caches under `manifests/v<version>` and reads the registry `flag`, `USEMCPKIT_REGISTRY` or the
/// folder published for this version names. The embedded one caches by its index hash and takes no other registry: a
/// `flag` is refused and `USEMCPKIT_REGISTRY` is not read.
pub fn open_registry_context(
    flag: Option<&str>,
    source: RegistrySource,
) -> Result<RegistryContext<RegistryFetcher>, RegistryError> {
    match source {
        RegistrySource::Published => RegistryContext::from_env(flag, RegistryFetcher::Http(HttpFetcher::new()?)),
        RegistrySource::Embedded(registry) => {
            if let Some(flag) = flag {
                return Err(RegistryError::failed(format!(
                    "this dev build reads only the registry built into it, not {flag}"
                )));
            }
            Ok(RegistryContext::new(
                resolve_embedded_cache_dir(&registry)?,
                EMBEDDED_REGISTRY_URL.to_owned(),
                RegistryFetcher::Embedded(registry),
            ))
        }
    }
}
