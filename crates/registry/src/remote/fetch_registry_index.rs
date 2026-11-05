use crate::consts::INDEX_FILE_NAME;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::fetch::Fetch;
use crate::remote::parse_registry_index::parse_registry_index;
use crate::remote::resolve_registry_link::resolve_registry_link;
use usemcpkit_manifest::registry::RegistryIndex;

pub async fn fetch_registry_index<F: Fetch>(context: &RegistryContext<F>) -> Result<RegistryIndex, RegistryError> {
    let url = resolve_registry_link(&context.registry_url, INDEX_FILE_NAME)?;
    parse_registry_index(&context.fetcher.fetch_text(&url).await?)
}
