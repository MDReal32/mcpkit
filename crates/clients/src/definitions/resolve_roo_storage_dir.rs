use crate::client_context::ClientContext;
use crate::definitions::resolve_vscode_user_dir::resolve_vscode_user_dir;
use std::path::PathBuf;

pub fn resolve_roo_storage_dir(context: &ClientContext) -> PathBuf {
    resolve_vscode_user_dir(context, "Code")
        .join("globalStorage")
        .join("rooveterinaryinc.roo-cline")
}
