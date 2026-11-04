use crate::repo::build_repo::build_repo;
use crate::repo::consts::REPO_CHECK_INTERVAL_MS;
use crate::repo::is_pinned_commit::is_pinned_commit;
use crate::repo::read_repo_state::read_repo_state;
use crate::repo::repo_options::RepoOptions;
use crate::repo::repo_signature::repo_signature;
use crate::repo::update_repo::update_repo;
use crate::upstream_error::UpstreamError;
use std::path::Path;
use usemcpkit_manifest::upstream::UpstreamRepo;

/// Makes `dir` a finished clone of `repo`. The clone is always used as it is; a clone made for another url, ref or
/// setup is replaced, and one at a branch or tag is compared with the remote once its last check is older than the
/// interval and rebuilt when the ref moved. A commit is pinned and never compared.
pub async fn ensure_repo(repo: &UpstreamRepo, dir: &Path, options: &RepoOptions) -> Result<(), UpstreamError> {
    let signature = repo_signature(repo)?;
    let state = match read_repo_state(dir).await? {
        Some(state) if state.signature == signature => state,
        _ => return build_repo(repo, dir, &signature, (options.now)(), &options.env).await,
    };
    let is_due = (options.now)().saturating_sub(state.checked_at) >= REPO_CHECK_INTERVAL_MS;
    if options.check && !is_pinned_commit(repo) && is_due {
        update_repo(repo, dir, &state, options).await?;
    }
    Ok(())
}
