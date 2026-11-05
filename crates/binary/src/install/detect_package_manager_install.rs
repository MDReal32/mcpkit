use crate::binary_error::BinaryError;
use crate::install::find_package_manager_install::find_package_manager_install;
use crate::install::package_manager_install::PackageManagerInstall;
use crate::install::strip_verbatim_prefix::strip_verbatim_prefix;
use std::path::Path;

/// `None` unless the runner at `exec_path` is one that Homebrew or winget installed.
pub fn detect_package_manager_install(exec_path: &Path) -> Result<Option<PackageManagerInstall>, BinaryError> {
    let real_path = std::fs::canonicalize(exec_path)
        .map_err(|error| BinaryError(format!("cannot resolve {}: {error}", exec_path.display())))?;
    find_package_manager_install(&strip_verbatim_prefix(real_path).to_string_lossy())
}
