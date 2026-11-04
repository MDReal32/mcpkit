use crate::cache::{now_millis, record_cache_entry};
use crate::catalog::download_manifest;
use crate::ids::resolve_manifest_path;
use crate::local::read_cached_manifest_text;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::Fetch;
use crate::sync::refresh_cached_parts::refresh_cached_parts;
use usemcpkit_core::hash::sha256_hex;
use usemcpkit_manifest::registry::RegistryServer;

/// Brings what is cached of one server up to date with the index: its manifest or shell, then its cached parts.
/// A server nobody used has nothing cached and is skipped. Returns the ids of the files it replaced.
pub async fn refresh_cached_server<F: Fetch>(
    server: &RegistryServer,
    context: &RegistryContext<F>,
) -> Result<Vec<String>, RegistryError> {
    let Some(cached) = read_cached_manifest_text(&context.dir, &server.id).await? else {
        return Ok(Vec::new());
    };
    let mut refreshed = Vec::new();
    if sha256_hex(&cached) == server.sha256 {
        let file = resolve_manifest_path(&context.dir, &server.id)?;
        record_cache_entry(context, &file, &cached, now_millis()).await?;
    } else {
        download_manifest(server, context).await?;
        refreshed.push(server.id.clone());
    }
    refreshed.extend(refresh_cached_parts(server, context).await?);
    Ok(refreshed)
}
