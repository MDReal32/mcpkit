use crate::cache::{now_millis, record_cache_entry};
use crate::ids::resolve_manifest_path;
use crate::local::write_text::write_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;

/// Keeps the downloaded text as it came, since its hash is what the index lists.
pub async fn write_cached_manifest<F>(context: &RegistryContext<F>, id: &str, text: &str) -> Result<(), RegistryError> {
    let file = resolve_manifest_path(&context.dir, id)?;
    write_text(&file, text).await?;
    record_cache_entry(context, &file, text, now_millis()).await
}
