use crate::cache::{now_millis, record_cache_entry};
use crate::ids::resolve_manifest_path;
use crate::local::format_cached_json::format_cached_json;
use crate::local::write_text::write_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;

/// Keeps the downloaded manifest formatted; it still matches the hash the index lists through its minified form.
pub async fn write_cached_manifest<F>(context: &RegistryContext<F>, id: &str, text: &str) -> Result<(), RegistryError> {
    let file = resolve_manifest_path(&context.dir, id)?;
    let formatted = format_cached_json(text)?;
    write_text(&file, &formatted).await?;
    record_cache_entry(context, &file, &formatted, None, now_millis()).await
}
