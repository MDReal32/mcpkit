use crate::local::resolve_user_dir;
use crate::registry_error::RegistryError;
use crate::remote::resolve_registry_url;
use crate::warn_on_stderr::warn_on_stderr;
use std::path::PathBuf;

pub struct RegistryContext<F> {
    /// Folder holding the cached index and manifests.
    pub dir: PathBuf,
    pub registry_url: String,
    pub fetcher: F,
    pub warn: Box<dyn Fn(&str)>,
}

impl<F> RegistryContext<F> {
    pub fn new(dir: PathBuf, registry_url: String, fetcher: F) -> Self {
        RegistryContext {
            dir,
            registry_url,
            fetcher,
            warn: Box::new(warn_on_stderr),
        }
    }

    /// `~/.usemcpkit/manifests` (or under `USEMCPKIT_HOME`) and the registry named by `flag`, `USEMCPKIT_REGISTRY` or the default.
    pub fn from_env(flag: Option<&str>, fetcher: F) -> Result<Self, RegistryError> {
        Ok(Self::new(resolve_user_dir()?, resolve_registry_url(flag), fetcher))
    }
}
