use std::path::Path;

/// Both paths made absolute without touching the disk, like Node's `path.resolve`; a path that cannot be made absolute
/// is compared as written.
pub fn is_same_file_path(left: &Path, right: &Path) -> bool {
    let absolute = |path: &Path| std::path::absolute(path).unwrap_or_else(|_| path.to_path_buf());
    absolute(left) == absolute(right)
}
