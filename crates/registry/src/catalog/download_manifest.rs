use crate::catalog::parse_manifest_text::parse_manifest_text;
use crate::local::write_cached_manifest;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::{Fetch, resolve_registry_link};
use usemcpkit_core::hash::sha256_hex;
use usemcpkit_manifest::ManifestDocument;
use usemcpkit_manifest::registry::RegistryServer;

/// Nothing is cached unless it matches the index hash and parses.
pub async fn download_manifest<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
) -> Result<ManifestDocument, RegistryError> {
    let url = resolve_registry_link(&context.registry_url, &server.url)?;
    let text = context.fetcher.fetch_text(&url).await?;
    if sha256_hex(&text) != server.sha256 {
        return Err(RegistryError::ChecksumMismatch(format!(
            "{}: {url} does not match the index checksum",
            server.id
        )));
    }
    let document = parse_manifest_text(server, &text)?;
    write_cached_manifest(context, &server.id, &text).await?;
    Ok(document)
}
