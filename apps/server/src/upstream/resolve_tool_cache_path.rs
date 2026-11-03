use crate::upstream::consts::UPSTREAM_CACHE_DIR_NAME;
use std::path::{Path, PathBuf};

/// `<dir>/upstream/<category>/<name>.json`, laid out like the manifests: `security:bitwarden` is
/// `upstream/security/bitwarden.json`.
pub fn resolve_tool_cache_path(dir: &Path, server_id: &str) -> PathBuf {
    let mut parts = server_id.split(':');
    let category = parts.next().unwrap_or_default();
    let name = parts.next().unwrap_or_default();
    dir.join(UPSTREAM_CACHE_DIR_NAME)
        .join(category)
        .join(format!("{name}.json"))
}
