use crate::consts::INDEX_FILE_NAME;
use crate::local::read_text_if_present::read_text_if_present;
use crate::registry_error::RegistryError;
use crate::remote::parse_registry_index;
use mcpkit_manifest::registry::RegistryIndex;
use std::path::Path;

pub async fn read_cached_index(dir: &Path) -> Result<Option<RegistryIndex>, RegistryError> {
    match read_text_if_present(&dir.join(INDEX_FILE_NAME)).await? {
        Some(text) => parse_registry_index(&text).map(Some),
        None => Ok(None),
    }
}
