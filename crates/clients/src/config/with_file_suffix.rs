use std::path::{Path, PathBuf};

/// `path` with `suffix` added to its file name, as `${path}${suffix}` builds it.
pub fn with_file_suffix(path: &Path, suffix: &str) -> PathBuf {
    let mut name = path.as_os_str().to_owned();
    name.push(suffix);
    PathBuf::from(name)
}
