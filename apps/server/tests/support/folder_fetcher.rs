use mcpkit_registry::{Fetch, RegistryError};
use std::path::PathBuf;

/// Serves a registry folder as if it were published at `registry_url`.
pub struct FolderFetcher {
    root: PathBuf,
    registry_url: String,
}

impl FolderFetcher {
    pub fn new(root: PathBuf, registry_url: &str) -> Self {
        Self {
            root,
            registry_url: registry_url.to_owned(),
        }
    }
}

impl Fetch for FolderFetcher {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        let path = url
            .strip_prefix(&format!("{}/", self.registry_url))
            .ok_or_else(|| RegistryError::failed(format!("GET {url} failed: 404")))?;
        std::fs::read_to_string(self.root.join(path))
            .map_err(|error| RegistryError::failed(format!("GET {url}: {error}")))
    }
}
