use crate::repo::read_repo_state::read_repo_state;
use crate::repo::remove_directory::remove_directory;
use crate::repo::replace_directory::replace_directory;
use crate::repo::set_up_clone::set_up_clone;
use crate::repo::sibling_path::sibling_path;
use crate::upstream_error::UpstreamError;
use std::path::Path;
use usemcpkit_core::env::Env;
use usemcpkit_manifest::upstream::UpstreamRepo;

/// Clones `repo`, checks out its ref, sets it up and records the commit it resolved to. It is built next to `dir`
/// and moved into place at the end, so a failed or interrupted run leaves nothing half-made; a clone another process
/// finished at the same commit meanwhile is kept.
pub async fn build_repo(
    repo: &UpstreamRepo,
    dir: &Path,
    signature: &str,
    now: u64,
    env: &Env,
) -> Result<(), UpstreamError> {
    let pid = std::process::id();
    let staging = sibling_path(dir, &format!(".tmp-{pid}"));
    let previous = sibling_path(dir, &format!(".old-{pid}"));
    let parent = dir
        .parent()
        .ok_or_else(|| UpstreamError::new(format!("{} has no parent folder to clone into", dir.display())))?;
    tokio::fs::create_dir_all(parent)
        .await
        .map_err(|error| UpstreamError::new(format!("cannot create {}: {error}", parent.display())))?;
    remove_directory(&staging).await?;
    let built = async {
        let state = set_up_clone(repo, &staging, signature, now, env).await?;
        let current = read_repo_state(dir).await?;
        let same =
            current.is_some_and(|current| current.signature == state.signature && current.commit == state.commit);
        match same {
            true => Ok(()),
            false => replace_directory(dir, &staging, &previous).await,
        }
    }
    .await;
    let cleaned = match remove_directory(&staging).await {
        Ok(()) => remove_directory(&previous).await,
        Err(error) => Err(error),
    };
    built.and(cleaned)
}
