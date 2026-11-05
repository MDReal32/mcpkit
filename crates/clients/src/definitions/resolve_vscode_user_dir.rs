use crate::client_context::ClientContext;
use std::path::PathBuf;

pub fn resolve_vscode_user_dir(context: &ClientContext, product: &str) -> PathBuf {
    context.app_data_dir.join(product).join("User")
}
