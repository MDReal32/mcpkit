use crate::catalog::download_manifest::download_manifest;
use crate::catalog::parse_manifest_text::parse_manifest_text;
use crate::local::read_cached_manifest_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use mcpkit_core::hash::sha256_hex;
use mcpkit_manifest::ManifestDocument;
use mcpkit_manifest::registry::RegistryServer;

/// The cached manifest file when it still matches the index, otherwise a verified download that replaces it.
pub async fn read_manifest_file<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
) -> Result<ManifestDocument, RegistryError> {
    match read_cached_manifest_text(&context.dir, &server.id).await? {
        Some(cached) if sha256_hex(&cached) == server.sha256 => parse_manifest_text(server, &cached),
        _ => download_manifest(server, context).await,
    }
}
