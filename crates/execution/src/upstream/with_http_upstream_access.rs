use crate::CallContext;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use crate::auth_fallback::candidates::{build_auth_candidates, order_auth_candidates};
use crate::upstream::upstream_access::UpstreamAccess;
use indexmap::IndexMap;
use usemcpkit_auth::credentials::save_form_answer;
use usemcpkit_core::LocalFuture;
use usemcpkit_manifest::Manifest;
use usemcpkit_upstream::UpstreamError;

/// Tries the manifest's auth candidates in order with their headers; a candidate whose credentials are unavailable or
/// that the upstream answers 401 is passed over, any other failure ends the attempt. The upstream is read from the
/// manifest each candidate resolved, whose `{domain}` is filled in even when the credentials form chose the domain.
pub async fn with_http_upstream_access<'r, T, R>(
    manifest: &Manifest,
    domain: Option<&str>,
    mut run: R,
    context: &CallContext,
) -> Result<T, UpstreamError>
where
    R: FnMut(UpstreamAccess) -> LocalFuture<'r, Result<T, UpstreamError>>,
{
    let preferred_labels = &context.state.preferred_auth_labels;
    let preferred = preferred_labels.borrow().get(&manifest.name).cloned();
    let candidates = order_auth_candidates(preferred.as_deref(), build_auth_candidates(manifest, domain, context));
    let mut failures = Vec::new();
    for candidate in candidates {
        let (label, kind) = (candidate.label.clone(), candidate.kind);
        let resolution = match (candidate.resolve)().await {
            Ok(resolution) => resolution,
            Err(error) => {
                failures.push(format!("{label}: {error}"));
                continue;
            }
        };
        let Some(upstream) = resolution.manifest.upstream.clone() else {
            return Err(UpstreamError::new(format!("{} has no upstream", manifest.name)));
        };
        let access = UpstreamAccess {
            upstream,
            headers: resolution.auth.headers.clone(),
            env: IndexMap::new(),
        };
        let result = match run(access).await {
            Ok(result) => result,
            Err(UpstreamError::Unauthorized(reason)) => {
                failures.push(format!("{label}: {reason}"));
                continue;
            }
            Err(error) => return Err(error),
        };
        if let Some(answer) = &resolution.save {
            save_form_answer(&resolution.manifest, answer, &context.auth)
                .await
                .map_err(|error| UpstreamError::Failed(error.0))?;
        }
        if kind == AuthCandidateKind::Provided {
            preferred_labels.borrow_mut().insert(manifest.name.clone(), label);
        }
        return Ok(result);
    }
    preferred_labels.borrow_mut().remove(&manifest.name);
    Err(UpstreamError::new(format!(
        "{}: no auth option worked\n  {}",
        manifest.name,
        failures.join("\n  ")
    )))
}
