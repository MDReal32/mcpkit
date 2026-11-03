use crate::repo::build_repo::build_repo;
use crate::repo::read_remote_commit::read_remote_commit;
use crate::repo::repo_options::RepoOptions;
use crate::repo::repo_state::RepoState;
use crate::repo::write_repo_state::write_repo_state;
use crate::upstream_error::UpstreamError;
use mcpkit_manifest::upstream::UpstreamRepo;
use std::path::Path;

/// Compares the commit the clone was built at with the remote's current one and builds the clone again when they
/// differ. The check is marked before it starts, and a remote that cannot be reached or a build that fails keeps the
/// clone it has, so the cache keeps serving and the next try is one interval away.
pub async fn update_repo(
    repo: &UpstreamRepo,
    dir: &Path,
    state: &RepoState,
    options: &RepoOptions,
) -> Result<(), UpstreamError> {
    let checked = RepoState {
        checked_at: (options.now)(),
        ..state.clone()
    };
    write_repo_state(dir, &checked).await?;
    let updated = async {
        let remote = read_remote_commit(repo, dir, &options.env).await?;
        match state.commit.as_deref() == Some(remote.as_str()) {
            true => Ok(()),
            false => build_repo(repo, dir, &state.signature, (options.now)(), &options.env).await,
        }
    }
    .await;
    if let Err(error) = updated {
        (options.warn)(&format!(
            "mcpkit: could not update {} at {}, using the clone it has: {error}",
            repo.url, repo.reference
        ));
    }
    Ok(())
}
