use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::candidates::list_interactive_candidates::list_interactive_candidates;
use crate::auth_fallback::candidates::list_provided_candidates::list_provided_candidates;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::domain::apply_domain;
use std::rc::Rc;

/// The `tokens.json` token first, then fallbacks whose credentials are set or saved, and only when nothing else works
/// the OAuth2 browser sign-in. A server that needs a domain and has none gets only the candidate that says so.
pub fn build_auth_candidates<'a>(
    manifest: &Manifest,
    domain: Option<&'a str>,
    context: &'a CallContext,
) -> Vec<AuthCandidate<'a>> {
    let target = match (&manifest.domain, domain) {
        (Some(_), None) => None,
        _ => Some(Rc::new(apply_domain(manifest, domain))),
    };
    let mut candidates = match &target {
        Some(target) => list_provided_candidates(target, domain, context),
        None => Vec::new(),
    };
    candidates.extend(list_interactive_candidates(manifest, target.as_ref(), context));
    candidates
}
