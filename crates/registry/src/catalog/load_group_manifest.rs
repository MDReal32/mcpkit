use crate::catalog::load_group_once::load_group_once;
use crate::catalog::retry_on_stale_index::retry_on_stale_index;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::registry::RegistryServer;

/// The manifest holding the tools of `group`: the cached copy when it still matches the index, otherwise a download
/// that replaces it. A server split into parts loads only that part; a whole manifest ignores `group`.
pub async fn load_group_manifest<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
    group: Option<&str>,
) -> Result<Manifest, RegistryError> {
    retry_on_stale_index(server, context, async |current| {
        load_group_once(current, context, group).await
    })
    .await
}
