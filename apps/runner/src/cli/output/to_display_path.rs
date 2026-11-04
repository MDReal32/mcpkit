use std::path::{MAIN_SEPARATOR, Path};

/// Shortens paths under the home folder to `~/...` for terminal output.
pub fn to_display_path(path: &Path, home_dir: &Path) -> String {
    let path = path.display().to_string();
    let home = home_dir.display().to_string();
    match path.strip_prefix(&home) {
        Some(rest) if rest.is_empty() || rest.starts_with(MAIN_SEPARATOR) => format!("~{rest}"),
        _ => path,
    }
}

#[cfg(test)]
mod tests {
    use super::to_display_path;
    use std::path::{MAIN_SEPARATOR, Path, PathBuf};

    #[test]
    fn shortens_only_paths_inside_the_home_folder() {
        let home = PathBuf::from(format!("{MAIN_SEPARATOR}home{MAIN_SEPARATOR}me"));
        let inside = home.join(".cursor").join("mcp.json");
        let sibling = PathBuf::from(format!("{}2{MAIN_SEPARATOR}x", home.display()));

        assert_eq!(
            to_display_path(&inside, &home),
            format!("~{MAIN_SEPARATOR}.cursor{MAIN_SEPARATOR}mcp.json")
        );
        assert_eq!(to_display_path(&home, &home), "~");
        assert_eq!(to_display_path(&sibling, &home), sibling.display().to_string());
        assert_eq!(to_display_path(Path::new("rel"), &home), "rel");
    }
}
