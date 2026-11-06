use crate::cache::{now_millis, record_cache_entry};
use crate::local::format_cached_json::format_cached_json;
use crate::local::resolve_part_path::resolve_part_path;
use crate::local::write_text::write_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;

/// Keeps the downloaded part formatted; it still matches the hash its shell lists through its minified form.
pub async fn write_cached_part<F>(
    context: &RegistryContext<F>,
    id: &str,
    part_name: &str,
    text: &str,
) -> Result<(), RegistryError> {
    let file = resolve_part_path(&context.dir, id, part_name)?;
    let formatted = format_cached_json(text)?;
    write_text(&file, &formatted).await?;
    record_cache_entry(context, &file, &formatted, now_millis()).await
}
