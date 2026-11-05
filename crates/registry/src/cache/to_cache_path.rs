use std::path::Path;

/// The key of a cached file in the map: its path inside the registry folder, with `/` on every platform.
pub fn to_cache_path(dir: &Path, file: &Path) -> String {
    let relative = file.strip_prefix(dir).unwrap_or(file);
    relative
        .components()
        .map(|component| component.as_os_str().to_string_lossy())
        .collect::<Vec<_>>()
        .join("/")
}
