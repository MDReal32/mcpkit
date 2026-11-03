use crate::repo::consts::REPO_DIR_PLACEHOLDER;
use crate::repo::ensure_repo::ensure_repo;
use crate::repo::repo_options::RepoOptions;
use crate::upstream_error::UpstreamError;
use mcpkit_manifest::upstream::StdioUpstream;
use std::path::Path;

/// A stdio upstream that names a `repo` is cloned and set up under `repo_dir` the first time it is needed and kept up
/// to date after that; the result runs the program with `{repo}` in its args replaced by that folder. A spec without a
/// repo is returned as it is.
pub async fn prepare_repo(
    spec: &StdioUpstream,
    repo_dir: Option<&Path>,
    options: &RepoOptions,
) -> Result<StdioUpstream, UpstreamError> {
    let Some(repo) = &spec.repo else {
        return Ok(spec.clone());
    };
    let Some(repo_dir) = repo_dir else {
        return Err(UpstreamError::new(format!(
            "\"{}\" runs from a repository but no folder was given to clone it into",
            spec.command
        )));
    };
    ensure_repo(repo, repo_dir, options).await?;
    let folder = repo_dir.to_string_lossy();
    let args = spec.args.as_ref().map(|args| {
        args.iter()
            .map(|arg| arg.replace(REPO_DIR_PLACEHOLDER, &folder))
            .collect()
    });
    Ok(StdioUpstream {
        args,
        repo: None,
        ..spec.clone()
    })
}
