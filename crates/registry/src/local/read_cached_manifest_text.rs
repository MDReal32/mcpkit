use crate::ids::resolve_manifest_path;
use crate::local::read_text_if_present::read_text_if_present;
use crate::registry_error::RegistryError;
use std::path::Path;

pub async fn read_cached_manifest_text(dir: &Path, id: &str) -> Result<Option<String>, RegistryError> {
    read_text_if_present(&resolve_manifest_path(dir, id)?).await
}
