use crate::consts::{EMBEDDED_REGISTRY_URL, INDEX_FILE_NAME};
use crate::registry_error::RegistryError;
use crate::remote::fetch::Fetch;

/// The registry folder compiled into a dev binary: each file's path inside the folder and its text.
#[derive(Clone, Copy, Debug)]
pub struct EmbeddedRegistry {
    files: &'static [(&'static str, &'static str)],
}

impl EmbeddedRegistry {
    pub const fn new(files: &'static [(&'static str, &'static str)]) -> Self {
        EmbeddedRegistry { files }
    }

    /// The text of the file at `path` inside the folder.
    pub fn file(&self, path: &str) -> Option<&'static str> {
        self.files
            .iter()
            .find(|(file_path, _)| *file_path == path)
            .map(|(_, text)| *text)
    }

    pub fn index_text(&self) -> Result<&'static str, RegistryError> {
        self.file(INDEX_FILE_NAME).ok_or_else(|| {
            RegistryError::failed(format!("the registry built into this binary has no {INDEX_FILE_NAME}"))
        })
    }
}

impl Fetch for EmbeddedRegistry {
    async fn fetch_text(&self, url: &str) -> Result<String, RegistryError> {
        url.strip_prefix(EMBEDDED_REGISTRY_URL)
            .and_then(|rest| rest.strip_prefix('/'))
            .and_then(|path| self.file(path))
            .map(str::to_owned)
            .ok_or_else(|| RegistryError::failed(format!("{url} is not in the registry built into this binary")))
    }
}

#[cfg(test)]
mod tests {
    use super::EmbeddedRegistry;
    use crate::consts::EMBEDDED_REGISTRY_URL;
    use crate::remote::fetch::Fetch;
    use crate::remote::resolve_registry_link::resolve_registry_link;

    const REGISTRY: EmbeddedRegistry = EmbeddedRegistry::new(&[("index.json", "{}"), ("git/github.json", "[]")]);

    #[tokio::test]
    async fn serves_its_files_by_the_links_the_registry_resolves() {
        let link = resolve_registry_link(EMBEDDED_REGISTRY_URL, "git/github.json").expect("a link");

        assert_eq!(REGISTRY.fetch_text(&link).await, Ok("[]".to_owned()));
        assert_eq!(REGISTRY.index_text(), Ok("{}"));
        assert!(
            REGISTRY
                .fetch_text("https://mdreal32.github.io/mcpkit/index.json")
                .await
                .is_err()
        );
    }
}
