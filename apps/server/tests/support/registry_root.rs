use std::path::{Path, PathBuf};

/// The registry `packages/servers` builds, laid out as it is published.
pub fn registry_root() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR")).join("../../packages/servers/build/manifests")
}
