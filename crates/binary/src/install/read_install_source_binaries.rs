use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_layout::BinaryLayout;
use crate::binary_pair::BinaryPair;
use crate::binary_source::BinarySource;
use crate::install::read_local_binaries::read_local_binaries;

/// An explicit runner path wins, otherwise the running runner is copied; each comes with the server next to it, except
/// a running dev build, which is its own server.
pub fn read_install_source_binaries(context: &BinaryContext, source: &BinarySource) -> Result<BinaryPair, BinaryError> {
    if let Some(path) = source.path.as_deref() {
        return read_local_binaries(path, context.target);
    }
    if context.layout == BinaryLayout::Pair {
        return read_local_binaries(&context.exec_path, context.target);
    }
    let binary = std::fs::read(&context.exec_path)
        .map_err(|error| BinaryError(format!("cannot read {}: {error}", context.exec_path.display())))?;
    Ok(BinaryPair {
        runner: binary.clone(),
        server: binary,
    })
}
