use crate::upstream::resolve_tool_cache_path::resolve_tool_cache_path;
use crate::upstream::tool_cache::ToolCache;
use std::path::Path;

pub async fn write_tool_cache(dir: &Path, server_id: &str, cache: &ToolCache) -> Result<(), String> {
    let file = resolve_tool_cache_path(dir, server_id);
    if let Some(parent) = file.parent() {
        tokio::fs::create_dir_all(parent)
            .await
            .map_err(|error| format!("cannot create {}: {error}", parent.display()))?;
    }
    let text = serde_json::to_string_pretty(cache).map_err(|error| error.to_string())?;
    tokio::fs::write(&file, format!("{text}\n"))
        .await
        .map_err(|error| format!("cannot write {}: {error}", file.display()))
}
