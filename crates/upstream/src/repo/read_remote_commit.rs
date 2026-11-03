use crate::repo::consts::REMOTE_CHECK_TIMEOUT;
use crate::repo::pick_remote_commit::pick_remote_commit;
use crate::repo::run_program::run_program;
use crate::upstream_error::UpstreamError;
use mcpkit_core::env::Env;
use mcpkit_manifest::upstream::UpstreamRepo;
use std::path::Path;

/// The commit the remote's copy of the ref points at now.
pub async fn read_remote_commit(repo: &UpstreamRepo, cwd: &Path, env: &Env) -> Result<String, UpstreamError> {
    let args = [
        "ls-remote".to_owned(),
        "--".to_owned(),
        repo.url.clone(),
        repo.reference.clone(),
        format!("{}^{{}}", repo.reference),
    ];
    let output = run_program("git", &args, cwd, REMOTE_CHECK_TIMEOUT, env).await?;
    pick_remote_commit(&output, &repo.reference)
        .ok_or_else(|| UpstreamError::new(format!("{} has no ref \"{}\"", repo.url, repo.reference)))
}
