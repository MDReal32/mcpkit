use crate::repo::consts::SETUP_TIMEOUT;
use crate::repo::repo_state::RepoState;
use crate::repo::run_program::run_program;
use crate::repo::write_repo_state::write_repo_state;
use crate::upstream_error::UpstreamError;
use mcpkit_core::env::Env;
use mcpkit_manifest::upstream::UpstreamRepo;
use std::path::Path;

/// Clones `repo` into `staging` (whose parent exists), checks out its ref, runs its setup steps there and marks it
/// finished; the state written is returned.
pub async fn set_up_clone(
    repo: &UpstreamRepo,
    staging: &Path,
    signature: &str,
    now: u64,
    env: &Env,
) -> Result<RepoState, UpstreamError> {
    let parent = staging.parent().unwrap_or(staging);
    let staging_arg = staging.to_string_lossy();
    let clone = ["clone", "--quiet", "--no-checkout", "--", &repo.url, &staging_arg].map(str::to_owned);
    run_program("git", &clone, parent, SETUP_TIMEOUT, env).await?;
    let checkout = ["checkout", "--quiet", "--detach", &repo.reference, "--"].map(str::to_owned);
    run_program("git", &checkout, staging, SETUP_TIMEOUT, env).await?;
    let rev_parse = ["rev-parse", "HEAD"].map(str::to_owned);
    let commit = run_program("git", &rev_parse, staging, SETUP_TIMEOUT, env).await?;
    for step in repo.setup.iter().flatten() {
        let args = step.args.clone().unwrap_or_default();
        run_program(&step.command, &args, staging, SETUP_TIMEOUT, env).await?;
    }
    let state = RepoState {
        signature: signature.to_owned(),
        commit: Some(commit),
        updated_at: now,
        checked_at: now,
    };
    write_repo_state(staging, &state).await?;
    Ok(state)
}
