use crate::catalog::parse_part_tools::parse_part_tools;
use crate::local::{read_cached_part_text, write_cached_part};
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::{Fetch, resolve_registry_link};
use mcpkit_core::hash::sha256_hex;
use mcpkit_manifest::registry::{ManifestPart, RegistryServer};
use mcpkit_manifest::tool::ToolSpec;

/// The cached part when it matches the checksum its shell lists, otherwise a verified download that replaces it.
pub async fn load_part_tools<F: Fetch>(
    server: &RegistryServer,
    part: &ManifestPart,
    context: &RegistryContext<F>,
) -> Result<Vec<ToolSpec>, RegistryError> {
    if let Some(cached) = read_cached_part_text(&context.dir, &server.id, &part.name).await?
        && sha256_hex(&cached) == part.sha256
    {
        return parse_part_tools(server, part, &cached);
    }
    let url = resolve_registry_link(&context.registry_url, &part.url)?;
    let text = context.fetcher.fetch_text(&url).await?;
    if sha256_hex(&text) != part.sha256 {
        return Err(RegistryError::failed(format!(
            "{}: {url} does not match the checksum in the manifest",
            server.id
        )));
    }
    let tools = parse_part_tools(server, part, &text)?;
    write_cached_part(context, &server.id, &part.name, &text).await?;
    Ok(tools)
}
