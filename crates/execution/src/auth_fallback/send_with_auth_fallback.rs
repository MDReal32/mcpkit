use crate::args::ToolArgs;
use crate::auth_fallback::accepted_auth_attempt::AcceptedAuthAttempt;
use crate::auth_fallback::attempt_auth::attempt_auth;
use crate::auth_fallback::auth_attempt::AuthAttempt;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use crate::auth_fallback::candidates::{build_auth_candidates, order_auth_candidates};
use crate::{CallContext, ToolError};
use usemcpkit_auth::domain::resolve_domain;
use usemcpkit_manifest::Manifest;
use usemcpkit_manifest::tool::ToolSpec;

/// Tries the server's auth candidates in order and keeps the one the API accepts.
pub async fn send_with_auth_fallback(
    manifest: &Manifest,
    tool: &ToolSpec,
    args: &ToolArgs,
    context: &CallContext,
) -> Result<AcceptedAuthAttempt, ToolError> {
    let domain = resolve_domain(manifest, &context.auth).await?;
    let preferred_labels = &context.state.preferred_auth_labels;
    let preferred = preferred_labels.borrow().get(&manifest.name).cloned();
    let candidates = order_auth_candidates(
        preferred.as_deref(),
        build_auth_candidates(manifest, domain.as_deref(), context),
    );
    let mut failures = Vec::new();
    for candidate in candidates {
        let (label, kind) = (candidate.label.clone(), candidate.kind);
        match attempt_auth(candidate, tool, args, context).await? {
            AuthAttempt::Accepted(accepted) => {
                if kind == AuthCandidateKind::Provided {
                    preferred_labels.borrow_mut().insert(manifest.name.clone(), label);
                }
                let mut accepted = *accepted;
                accepted.domain = accepted.domain.or_else(|| domain.clone());
                return Ok(accepted);
            }
            AuthAttempt::Rejected(reason) => failures.push(format!("{label}: {reason}")),
        }
    }
    preferred_labels.borrow_mut().remove(&manifest.name);
    Err(ToolError(format!(
        "{}: no auth option worked\n  {}",
        manifest.name,
        failures.join("\n  ")
    )))
}
