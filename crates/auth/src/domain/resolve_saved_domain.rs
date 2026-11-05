use crate::config::{list_known_hosts, load_config, read_server_config};
use crate::domain::saved_domain::SavedDomain;
use crate::project::{pick_remote_host, resolve_project};
use crate::{AuthContext, AuthError, ServerKey};
use serde_json::Value;
use usemcpkit_manifest::Manifest;

pub async fn resolve_saved_domain(manifest: &Manifest, context: &AuthContext) -> Result<SavedDomain, AuthError> {
    let config = load_config(&context.home).await?;
    let server = read_server_config(&config, &ServerKey::of(manifest));
    let known_hosts = list_known_hosts(server);
    let only_host = || match known_hosts.as_slice() {
        [host] => SavedDomain::Host(host.clone()),
        _ => SavedDomain::Undecided,
    };
    if known_hosts.is_empty() {
        return Ok(SavedDomain::None);
    }
    let Some(project_dir) = &context.project_dir else {
        return Ok(only_host());
    };
    let project = resolve_project(project_dir).await;
    let bound = server
        .and_then(|server| server.get("projects")?.get(&project.key))
        .and_then(Value::as_str)
        .filter(|bound| !bound.is_empty());
    if let Some(bound) = bound {
        return Ok(SavedDomain::Host(bound.to_owned()));
    }
    let matches_remote = manifest
        .domain
        .as_ref()
        .is_some_and(|domain| domain.match_git_remote == Some(true));
    let remote = project
        .remote_host
        .filter(|_| matches_remote)
        .and_then(|remote_host| pick_remote_host(&known_hosts, &remote_host).cloned());
    Ok(remote.map_or_else(only_host, SavedDomain::Host))
}
