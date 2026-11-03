use crate::registry_error::RegistryError;
use mcpkit_manifest::registry::{ManifestPart, RegistryServer};
use mcpkit_manifest::tool::ToolSpec;
use serde_json::Value;

pub fn parse_part_tools(
    server: &RegistryServer,
    part: &ManifestPart,
    text: &str,
) -> Result<Vec<ToolSpec>, RegistryError> {
    let label = format!("{}: part {}", server.id, part.name);
    let mut data: Value =
        serde_json::from_str(text).map_err(|error| RegistryError::failed(format!("{label}: invalid JSON: {error}")))?;
    let tools = match data.get_mut("tools") {
        Some(tools @ Value::Array(_)) => tools.take(),
        _ => {
            return Err(RegistryError::failed(format!("{label} must contain a \"tools\" array")));
        }
    };
    serde_json::from_value(tools).map_err(|error| RegistryError::failed(format!("{label}: {error}")))
}
