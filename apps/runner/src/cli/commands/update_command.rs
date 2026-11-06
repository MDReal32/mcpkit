use crate::cli::distribution::Distribution;
use crate::cli::registry::update_manifests;
use crate::cli::run_local::run_local;

pub fn update_command(registry: Option<String>, distribution: Distribution) -> i32 {
    run_local(async move { update_manifests(registry.as_deref(), distribution.registry).await })
}
