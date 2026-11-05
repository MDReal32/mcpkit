use crate::ids::{is_part_name, parse_server_id};
use crate::registry_error::RegistryError;
use std::path::{Path, PathBuf};

/// `<dir>/<category>/<name>/<part>.json`; both patterns admit no separators or dots, so it cannot leave `dir`.
pub fn resolve_part_path(dir: &Path, id: &str, part_name: &str) -> Result<PathBuf, RegistryError> {
    match parse_server_id(id) {
        Some((category, name)) if is_part_name(part_name) => {
            Ok(dir.join(category).join(name).join(format!("{part_name}.json")))
        }
        _ => Err(RegistryError::failed(format!(
            "invalid manifest part: {id} {part_name}"
        ))),
    }
}
