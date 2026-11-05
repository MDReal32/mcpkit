use crate::client_context::ClientContext;
use std::path::PathBuf;

pub fn resolve_codex_home(context: &ClientContext) -> PathBuf {
    context
        .env
        .get("CODEX_HOME")
        .map(PathBuf::from)
        .unwrap_or_else(|| context.home_dir.join(".codex"))
}
