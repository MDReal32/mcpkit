use crate::catalog::read_manifest_file::read_manifest_file;
use crate::catalog::retry_on_stale_index::retry_on_stale_index;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use mcpkit_manifest::registry::RegistryServer;

/// The group names of a server split into parts, read from its shell alone; empty when its tools are in one manifest.
pub async fn load_groups<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
) -> Result<Vec<String>, RegistryError> {
    retry_on_stale_index(server, context, async |current| {
        let document = read_manifest_file(current, context).await?;
        Ok(document
            .parts
            .map(|parts| parts.into_iter().map(|part| part.name).collect())
            .unwrap_or_default())
    })
    .await
}
