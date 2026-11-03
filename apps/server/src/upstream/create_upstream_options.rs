use crate::upstream::resolve_repo_dir::resolve_repo_dir;
use mcpkit_core::update::AUTO_UPDATE_ENV;
use mcpkit_execution::CallContext;
use mcpkit_manifest::Manifest;
use mcpkit_upstream::UpstreamOptions;
use std::rc::Rc;

/// What every connection to the manifest's upstream shares; the access of one attempt is added to it.
pub fn create_upstream_options(manifest: &Manifest, calls: &CallContext) -> UpstreamOptions {
    let mut options = UpstreamOptions::new(Rc::clone(&calls.auth.http), calls.auth.env.clone());
    options.repo_dir = Some(resolve_repo_dir(&calls.auth.home, manifest));
    options.check_repo = calls.auth.env.get(AUTO_UPDATE_ENV) != Some("0");
    options.client_version = env!("CARGO_PKG_VERSION").to_owned();
    options
}
