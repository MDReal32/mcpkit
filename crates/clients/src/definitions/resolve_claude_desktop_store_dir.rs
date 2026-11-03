use crate::client_context::ClientContext;
use crate::consts::CLAUDE_DESKTOP_STORE_DATA_DIR;
use std::path::PathBuf;

pub fn resolve_claude_desktop_store_dir(context: &ClientContext) -> PathBuf {
    let local_app_data_dir = context
        .env
        .get("LOCALAPPDATA")
        .map(PathBuf::from)
        .unwrap_or_else(|| context.home_dir.join("AppData").join("Local"));
    CLAUDE_DESKTOP_STORE_DATA_DIR
        .iter()
        .fold(local_app_data_dir, |dir, segment| dir.join(segment))
}
