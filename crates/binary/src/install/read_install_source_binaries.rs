use crate::binary_context::BinaryContext;
use crate::binary_error::BinaryError;
use crate::binary_pair::BinaryPair;
use crate::binary_source::BinarySource;
use crate::install::read_local_binaries::read_local_binaries;

/// An explicit runner path wins, otherwise the running runner is copied; each comes with the server next to it.
pub fn read_install_source_binaries(context: &BinaryContext, source: &BinarySource) -> Result<BinaryPair, BinaryError> {
    let runner_path = source.path.as_deref().unwrap_or(&context.exec_path);
    read_local_binaries(runner_path, context.target)
}
