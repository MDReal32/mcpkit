use std::path::{Path, PathBuf};

/// `path` with `suffix` added to its last component: `repos/demo` → `repos/demo.tmp-12`.
pub fn sibling_path(path: &Path, suffix: &str) -> PathBuf {
    let mut sibling = path.as_os_str().to_owned();
    sibling.push(suffix);
    PathBuf::from(sibling)
}
