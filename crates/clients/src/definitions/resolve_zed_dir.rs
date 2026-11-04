use crate::client_context::ClientContext;
use std::path::PathBuf;
use usemcpkit_core::platform::Platform;

pub fn resolve_zed_dir(context: &ClientContext) -> PathBuf {
    if context.platform == Platform::Windows {
        return context.app_data_dir.join("Zed");
    }
    context.xdg_config_dir.join("zed")
}
