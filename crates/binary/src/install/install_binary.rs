use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_source::BinarySource;
use crate::install::installed_binary::InstalledBinary;
use crate::install::is_same_file_path::is_same_file_path;
use crate::install::read_install_source_binaries::read_install_source_binaries;
use crate::install::resolve_installed_binary_path::resolve_installed_binary_path;
use crate::install::sibling_server_path::sibling_server_path;
use crate::install::write_binary_pair::write_binary_pair;

/// Places the runner and its server in `<mcpkit home>/bin`; a runner started from there is left as it is.
pub fn install_binary(context: &BinaryContext, source: &BinarySource) -> Result<InstalledBinary, BinaryError> {
    let path = resolve_installed_binary_path(&context.home_dir, context.target);
    let installed = InstalledBinary {
        server_path: sibling_server_path(&path, context.target),
        path,
        version: source.version.clone(),
    };
    if source.path.is_none() && is_same_file_path(&context.exec_path, &installed.path) {
        return Ok(installed);
    }
    let binaries = read_install_source_binaries(context, source)?;
    write_binary_pair(&installed.path, context.target, &binaries)?;
    Ok(installed)
}
