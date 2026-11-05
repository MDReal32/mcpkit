use crate::upstream::resolve_tool_cache_path::resolve_tool_cache_path;
use crate::upstream::tool_cache::ToolCache;
use serde_json::Value;
use std::io::ErrorKind;
use std::path::Path;

/// The cached tools of a server; `None` when there is no cache or it has another shape, so the upstream is asked
/// again. A file that is not JSON is an error.
pub async fn read_tool_cache(dir: &Path, server_id: &str) -> Result<Option<ToolCache>, String> {
    let file = resolve_tool_cache_path(dir, server_id);
    let text = match tokio::fs::read_to_string(&file).await {
        Ok(text) => text,
        Err(error) if error.kind() == ErrorKind::NotFound => return Ok(None),
        Err(error) => return Err(format!("cannot read {}: {error}", file.display())),
    };
    let body: Value =
        serde_json::from_str(&text).map_err(|error| format!("{} is not JSON: {error}", file.display()))?;
    Ok(serde_json::from_value(body).ok())
}
