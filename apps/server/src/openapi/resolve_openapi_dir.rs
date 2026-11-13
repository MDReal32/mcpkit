use crate::openapi::consts::OPENAPI_CACHE_DIR_NAME;
use std::path::{Path, PathBuf};

/// `<dir>/openapi/<category>/<name>`, the folder holding a server's downloaded documents, built tools and `hosts.json`.
pub fn resolve_openapi_dir(dir: &Path, server_id: &str) -> PathBuf {
    let mut parts = server_id.split(':');
    let category = parts.next().unwrap_or_default();
    let name = parts.next().unwrap_or_default();
    dir.join(OPENAPI_CACHE_DIR_NAME).join(category).join(name)
}
