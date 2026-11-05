use crate::local::read_text_if_present::read_text_if_present;
use crate::local::resolve_part_path::resolve_part_path;
use crate::registry_error::RegistryError;
use std::path::Path;

pub async fn read_cached_part_text(dir: &Path, id: &str, part_name: &str) -> Result<Option<String>, RegistryError> {
    read_text_if_present(&resolve_part_path(dir, id, part_name)?).await
}
