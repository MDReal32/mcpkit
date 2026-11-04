use crate::client_context::ClientContext;
use std::path::PathBuf;
use usemcpkit_core::platform::Platform;

pub fn resolve_devin_dir(context: &ClientContext) -> PathBuf {
    let base = if context.platform == Platform::Windows {
        &context.app_data_dir
    } else {
        &context.xdg_config_dir
    };
    base.join("devin")
}
