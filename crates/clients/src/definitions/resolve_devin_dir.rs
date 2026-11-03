use crate::client_context::ClientContext;
use mcpkit_core::platform::Platform;
use std::path::PathBuf;

pub fn resolve_devin_dir(context: &ClientContext) -> PathBuf {
    let base = if context.platform == Platform::Windows {
        &context.app_data_dir
    } else {
        &context.xdg_config_dir
    };
    base.join("devin")
}
