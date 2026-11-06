use crate::cli::registry::create_registry_context::create_registry_context;
use usemcpkit_registry::sync_registry;

/// Refreshes the registry after an install; a failure is reported and changes nothing else.
pub async fn sync_quietly() {
    let synced = match create_registry_context(None) {
        Ok(context) => sync_registry(&context)
            .await
            .map(|_| ())
            .map_err(|error| error.to_string()),
        Err(error) => Err(error),
    };
    if let Err(error) = synced {
        eprintln!("usemcpkit: registry sync failed: {error}");
    }
}
