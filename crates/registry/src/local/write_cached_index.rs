use crate::cache::{now_millis, record_cache_entry};
use crate::consts::INDEX_FILE_NAME;
use crate::local::write_text::write_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use mcpkit_manifest::registry::RegistryIndex;

/// Written the way the CLI writes it, two-space JSON and a final newline, so both read and hash the same file.
pub async fn write_cached_index<F>(context: &RegistryContext<F>, index: &RegistryIndex) -> Result<(), RegistryError> {
    let file = context.dir.join(INDEX_FILE_NAME);
    let json = serde_json::to_string_pretty(index).map_err(|error| RegistryError::failed(error.to_string()))?;
    let text = format!("{json}\n");
    write_text(&file, &text).await?;
    record_cache_entry(context, &file, &text, now_millis()).await
}
