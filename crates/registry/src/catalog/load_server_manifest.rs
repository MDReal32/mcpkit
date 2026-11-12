use crate::catalog::read_manifest_file::read_manifest_file;
use crate::catalog::retry_on_stale_index::retry_on_stale_index;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::registry::RegistryServer;

/// The manifest of the server itself, with its auth, domain and upstream: the whole manifest, or the shell of one split
/// into parts, whose `tools` are empty because they live in the parts.
pub async fn load_server_manifest<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
) -> Result<Manifest, RegistryError> {
    retry_on_stale_index(server, context, async |current| {
        Ok(read_manifest_file(current, context).await?.manifest)
    })
    .await
}
