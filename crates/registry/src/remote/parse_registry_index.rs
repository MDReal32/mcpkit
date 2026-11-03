use crate::registry_error::RegistryError;
use crate::remote::parse_registry_server::parse_registry_server;
use mcpkit_manifest::registry::RegistryIndex;
use serde_json::Value;

/// Keeps only what the index promises; extra fields, such as the `tools` older registries listed, are dropped.
pub fn parse_registry_index(text: &str) -> Result<RegistryIndex, RegistryError> {
    let body: Value = serde_json::from_str(text)
        .map_err(|error| RegistryError::failed(format!("registry index.json is not valid JSON: {error}")))?;
    let Some(servers) = body.get("servers").and_then(Value::as_array) else {
        return Err(RegistryError::failed(
            "registry index.json must contain a \"servers\" array",
        ));
    };
    let servers = servers
        .iter()
        .enumerate()
        .map(|(position, entry)| parse_registry_server(entry, position))
        .collect::<Result<_, _>>()
        .map_err(RegistryError::Failed)?;
    Ok(RegistryIndex { servers })
}
