use crate::binary_context::BinaryContext;
use crate::install::is_same_file_path::is_same_file_path;
use crate::install::resolve_installed_binary_path::resolve_installed_binary_path;

/// Whether this process is the runner `usemcpkit install` placed in the usemcpkit home.
pub fn is_installed_binary(context: &BinaryContext) -> bool {
    is_same_file_path(
        &context.exec_path,
        &resolve_installed_binary_path(&context.home_dir, context.target),
    )
}
