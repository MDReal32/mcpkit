use crate::cli::consts::{EXIT_FAILURE, EXIT_SUCCESS};
use crate::cli::output::describe_sync_report;
use crate::cli::registry::create_registry_context::create_registry_context;
use mcpkit_registry::sync_registry;

/// Refreshes the cached index and the manifests already on disk; a registry that cannot be reached is reported, not
/// returned.
pub async fn update_manifests(registry_url: Option<&str>) -> i32 {
    let synced = match create_registry_context(registry_url) {
        Ok(context) => sync_registry(&context).await.map_err(|error| error.to_string()),
        Err(error) => Err(error),
    };
    match synced {
        Ok(report) => {
            for line in describe_sync_report(&report) {
                println!("{line}");
            }
            if report.failed.is_empty() {
                EXIT_SUCCESS
            } else {
                EXIT_FAILURE
            }
        }
        Err(error) => {
            eprintln!("could not update the manifests: {error}");
            EXIT_FAILURE
        }
    }
}
