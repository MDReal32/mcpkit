use crate::catalog::load_part_tools::load_part_tools;
use crate::catalog::read_manifest_file::read_manifest_file;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;

pub async fn load_group_once<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
    group: Option<&str>,
) -> Result<Manifest, RegistryError> {
    let document = read_manifest_file(server, context).await?;
    let Some(parts) = &document.parts else {
        return Ok(document.manifest);
    };
    let Some(part) = parts.iter().find(|candidate| Some(candidate.name.as_str()) == group) else {
        return Err(RegistryError::failed(format!(
            "{} has no group \"{}\"",
            server.id,
            group.unwrap_or_default()
        )));
    };
    let tools = load_part_tools(server, part, context).await?;
    Ok(Manifest {
        tools,
        ..document.manifest
    })
}
