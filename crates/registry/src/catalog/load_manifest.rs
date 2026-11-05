use crate::catalog::load_group_manifest::load_group_manifest;
use crate::consts::TOOL_NAME_SEPARATOR;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;

/// The manifest holding `tool`: the part of its group for a server split into parts, the whole manifest otherwise.
pub async fn load_manifest<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
    tool: &str,
) -> Result<Manifest, RegistryError> {
    let group = tool.split(TOOL_NAME_SEPARATOR).next().unwrap_or_default();
    load_group_manifest(server, context, Some(group)).await
}
