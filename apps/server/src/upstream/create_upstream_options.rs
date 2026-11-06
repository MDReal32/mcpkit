use crate::upstream::resolve_repo_dir::resolve_repo_dir;
use std::rc::Rc;
use usemcpkit_core::update::is_auto_update_enabled;
use usemcpkit_execution::CallContext;
use usemcpkit_manifest::Manifest;
use usemcpkit_upstream::UpstreamOptions;

/// What every connection to the manifest's upstream shares; the access of one attempt is added to it.
pub fn create_upstream_options(manifest: &Manifest, calls: &CallContext) -> UpstreamOptions {
    let mut options = UpstreamOptions::new(Rc::clone(&calls.auth.http), calls.auth.env.clone());
    options.repo_dir = Some(resolve_repo_dir(&calls.auth.home, manifest));
    options.check_repo = is_auto_update_enabled(&calls.auth.env);
    options.client_version = env!("CARGO_PKG_VERSION").to_owned();
    options
}
