use crate::ids::parse_server_id::parse_server_id;
use crate::registry_error::RegistryError;
use std::path::{Path, PathBuf};

/// The id pattern admits no separators or dots, so the result cannot leave `dir`.
pub fn resolve_manifest_path(dir: &Path, id: &str) -> Result<PathBuf, RegistryError> {
    let (category, name) =
        parse_server_id(id).ok_or_else(|| RegistryError::failed(format!("invalid server id: {id}")))?;
    Ok(dir.join(category).join(format!("{name}.json")))
}
