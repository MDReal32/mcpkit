use crate::CallContext;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use crate::auth_fallback::candidates::{build_auth_candidates, order_auth_candidates};
use crate::upstream::consts::UPSTREAM_PREFERENCE_SUFFIX;
use crate::upstream::upstream_access::UpstreamAccess;
use crate::upstream::with_upstream_auth::with_upstream_auth;
use indexmap::IndexMap;
use usemcpkit_auth::credentials::save_form_answer;
use usemcpkit_core::LocalFuture;
use usemcpkit_manifest::Manifest;
use usemcpkit_upstream::UpstreamError;

/// Tries the auth candidates of the upstream in order with their headers (its own `auth`, the manifest's when it has
/// none); a candidate whose credentials are unavailable or that the upstream answers 401 is passed over, any other
/// failure ends the attempt. The upstream is read from the manifest each candidate resolved, whose `{domain}` is
/// filled in even when the credentials form chose the domain. The preferred option is remembered apart from the one of
/// the manifest's own tools, which sign in differently.
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
    let preference_key = format!("{}{UPSTREAM_PREFERENCE_SUFFIX}", manifest.name);
    let preferred = preferred_labels.borrow().get(&preference_key).cloned();
    let signed_in = with_upstream_auth(manifest);
    let candidates = order_auth_candidates(preferred.as_deref(), build_auth_candidates(&signed_in, domain, context));
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
            preferred_labels.borrow_mut().insert(preference_key, label);
        }
        return Ok(result);
    }
    preferred_labels.borrow_mut().remove(&preference_key);
    Err(UpstreamError::new(format!(
        "{}: no auth option worked\n  {}",
        manifest.name,
        failures.join("\n  ")
    )))
}
