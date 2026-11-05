use crate::cache::{now_millis, record_cache_entry};
use crate::local::resolve_part_path::resolve_part_path;
use crate::local::write_text::write_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;

/// Keeps the downloaded text as it came, since its hash is what the shell lists.
pub async fn write_cached_part<F>(
    context: &RegistryContext<F>,
    id: &str,
    part_name: &str,
    text: &str,
) -> Result<(), RegistryError> {
    let file = resolve_part_path(&context.dir, id, part_name)?;
    write_text(&file, text).await?;
    record_cache_entry(context, &file, text, now_millis()).await
}
