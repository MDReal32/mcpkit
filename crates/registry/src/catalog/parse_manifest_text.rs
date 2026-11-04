use crate::catalog::check_identity::check_identity;
use crate::catalog::check_manifest_parts::check_manifest_parts;
use crate::registry_error::RegistryError;
use serde_json::Value;
use usemcpkit_manifest::ManifestDocument;
use usemcpkit_manifest::registry::RegistryServer;

/// A whole manifest or a shell (a manifest with `parts` instead of tools), checked to be the server the index names.
pub fn parse_manifest_text(server: &RegistryServer, text: &str) -> Result<ManifestDocument, RegistryError> {
    let data: Value = serde_json::from_str(text)
        .map_err(|error| RegistryError::failed(format!("{}: invalid JSON: {error}", server.id)))?;
    let document =
        ManifestDocument::from_value(data).map_err(|error| RegistryError::failed(format!("{}: {error}", server.id)))?;
    check_identity(server, &document.manifest).map_err(RegistryError::Failed)?;
    if let Some(parts) = &document.parts {
        check_manifest_parts(parts).map_err(RegistryError::Failed)?;
    }
    Ok(document)
}
