use crate::cli::consts::{EXIT_FAILURE, EXIT_SUCCESS};
use crate::cli::distribution::Distribution;
use crate::cli::registry::update_manifests;
use crate::cli::run_command::run_command;
use crate::cli::update::upgrade_binary;

/// What the scheduled job runs: the cached manifests first, then the binaries; a failure of one does not skip the other.
pub fn upgrade_command(distribution: Distribution) -> i32 {
    run_command(async move {
        let manifests = update_manifests(None, distribution.registry).await;
        let binary = upgrade_binary(distribution.layout).await?;
        Ok(if manifests == EXIT_SUCCESS && binary == EXIT_SUCCESS {
            EXIT_SUCCESS
        } else {
            EXIT_FAILURE
        })
    })
}
