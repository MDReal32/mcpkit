use crate::catalog::{load_part_tools, read_manifest_file};
use crate::local::read_cached_part_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use mcpkit_core::hash::sha256_hex;
use mcpkit_manifest::registry::RegistryServer;

/// Re-downloads the parts of a server that are already cached and no longer match their shell; a part nobody opened
/// is never downloaded. Returns `<id>/<part>` for each part it replaced.
pub async fn refresh_cached_parts<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
) -> Result<Vec<String>, RegistryError> {
    let Some(parts) = read_manifest_file(server, context).await?.parts else {
        return Ok(Vec::new());
    };
    let mut refreshed = Vec::new();
    for part in &parts {
        match read_cached_part_text(&context.dir, &server.id, &part.name).await? {
            Some(cached) if sha256_hex(&cached) != part.sha256 => {
                load_part_tools(server, part, context).await?;
                refreshed.push(format!("{}/{}", server.id, part.name));
            }
            _ => {}
        }
    }
    Ok(refreshed)
}
