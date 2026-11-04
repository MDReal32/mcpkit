use crate::catalog::matches_selection::matches_selection;
use crate::catalog::registry_catalog::RegistryCatalog;
use usemcpkit_execution::CallContext;
use usemcpkit_registry::{Fetch, RegistryContext, ensure_manifest_index, read_cached_index};

/// The servers named in `selection`, all of them when it is empty, read from the cached index alone. `calls` is what
/// upstream servers are reached with while their tools are discovered.
pub async fn load_catalog<F: Fetch>(
    selection: &[String],
    context: RegistryContext<F>,
    calls: CallContext,
) -> Result<RegistryCatalog<F>, String> {
    ensure_manifest_index(&context).await?;
    let Some(index) = read_cached_index(&context.dir)
        .await
        .map_err(|error| error.to_string())?
    else {
        return Err("no registry index found; run `usemcpkit update` to download it".into());
    };
    let unknown: Vec<&str> = selection
        .iter()
        .filter(|name| !index.servers.iter().any(|server| matches_selection(&server.id, name)))
        .map(String::as_str)
        .collect();
    if !unknown.is_empty() {
        let available: Vec<&str> = index.servers.iter().map(|server| server.id.as_str()).collect();
        return Err(format!(
            "unknown server(s): {}. Available: {}",
            unknown.join(", "),
            available.join(", ")
        ));
    }
    let servers = index
        .servers
        .into_iter()
        .filter(|server| selection.is_empty() || selection.iter().any(|name| matches_selection(&server.id, name)))
        .collect();
    Ok(RegistryCatalog::new(servers, context, calls))
}
