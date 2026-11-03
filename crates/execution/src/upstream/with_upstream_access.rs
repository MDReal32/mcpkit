use crate::CallContext;
use crate::upstream::read_forwarded_env::read_forwarded_env;
use crate::upstream::upstream_access::UpstreamAccess;
use crate::upstream::with_http_upstream_access::with_http_upstream_access;
use indexmap::IndexMap;
use mcpkit_auth::domain::resolve_domain;
use mcpkit_core::LocalFuture;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::domain::apply_domain;
use mcpkit_manifest::upstream::UpstreamSpec;
use mcpkit_upstream::UpstreamError;

/// Runs `run` with the access of an `upstream` manifest. A stdio upstream gets its forwarded credentials, asked for in
/// the credentials form when missing and saved once `run` succeeded; an HTTP one tries the manifest's auth options in
/// order like an API call does, moving on when `run` fails with `UpstreamError::Unauthorized`.
pub async fn with_upstream_access<'r, T, R>(
    manifest: &Manifest,
    mut run: R,
    context: &CallContext,
) -> Result<T, UpstreamError>
where
    R: FnMut(UpstreamAccess) -> LocalFuture<'r, Result<T, UpstreamError>>,
{
    let domain = resolve_domain(manifest, &context.auth)
        .await
        .map_err(|error| UpstreamError::Failed(error.0))?;
    let target = apply_domain(manifest, domain.as_deref());
    let Some(upstream) = target.upstream else {
        return Err(UpstreamError::new(format!("{} has no upstream", manifest.name)));
    };
    let UpstreamSpec::Stdio(stdio) = &upstream else {
        return with_http_upstream_access(manifest, upstream, domain.as_deref(), run, context).await;
    };
    let forwarded = read_forwarded_env(manifest, stdio, domain.as_deref(), &context.auth)
        .await
        .map_err(|error| UpstreamError::Failed(error.0))?;
    let result = run(UpstreamAccess {
        env: forwarded.env.clone(),
        headers: IndexMap::new(),
        upstream,
    })
    .await?;
    forwarded
        .commit(&context.auth)
        .await
        .map_err(|error| UpstreamError::Failed(error.0))?;
    Ok(result)
}
