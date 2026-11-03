use crate::cache::{now_millis, touch_cache_entry};
use crate::consts::INDEX_FILE_NAME;
use crate::local::write_cached_index;
use crate::registry_context::RegistryContext;
use crate::registry_error::RegistryError;
use crate::remote::{Fetch, fetch_registry_index};
use crate::sync::refresh_cached_server::refresh_cached_server;
use crate::sync::sync_failure::SyncFailure;
use crate::sync::sync_report::SyncReport;

/// Refreshes the cached index and re-downloads only the manifests and parts that are already cached and no longer
/// match it; servers and parts nobody used are never downloaded. One server failing does not stop the others.
pub async fn sync_registry<F: Fetch>(context: &RegistryContext<F>) -> Result<SyncReport, RegistryError> {
    touch_cache_entry(context, &context.dir.join(INDEX_FILE_NAME), now_millis()).await?;
    let index = fetch_registry_index(context).await?;
    write_cached_index(context, &index).await?;
    let mut report = SyncReport {
        servers: index.servers.len(),
        ..SyncReport::default()
    };
    for server in &index.servers {
        match refresh_cached_server(server, context).await {
            Ok(refreshed) => report.refreshed.extend(refreshed),
            Err(error) => report.failed.push(SyncFailure {
                id: server.id.clone(),
                error: error.to_string(),
            }),
        }
    }
    Ok(report)
}
