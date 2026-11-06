mod binary_context;
mod binary_error;
mod binary_layout;
mod binary_pair;
mod binary_source;
mod binary_update_result;
mod consts;
mod install;
pub mod platform;
mod release;
pub mod schedule;
pub mod tar;
mod update;

pub use binary_context::BinaryContext;
pub use binary_error::BinaryError;
pub use binary_layout::BinaryLayout;
pub use binary_pair::BinaryPair;
pub use binary_source::BinarySource;
pub use binary_update_result::BinaryUpdateResult;
pub use consts::{NPM_REGISTRY_ENV, UPDATE_CHECK_INTERVAL_MS};
pub use install::{
    InstalledBinary, PackageManagerInstall, detect_package_manager_install, find_package_manager_install,
    install_binary, is_installed_binary, resolve_installed_binary_path, resolve_installed_server_path,
    restore_server_binary, sibling_server_path,
};
pub use release::{PackageRelease, read_package_release, verify_integrity};
pub use update::{auto_update_binary, check_for_binary_update, update_binary};
