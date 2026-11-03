use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::candidates::create_missing_domain_candidate::create_missing_domain_candidate;
use crate::auth_fallback::candidates::to_sign_in_candidate::to_sign_in_candidate;
use mcpkit_manifest::Manifest;
use std::rc::Rc;

/// The OAuth2 browser sign-ins, or the candidate that says the domain is missing.
pub fn list_interactive_candidates<'a>(
    manifest: &Manifest,
    target: Option<&Rc<Manifest>>,
    context: &'a CallContext,
) -> Vec<AuthCandidate<'a>> {
    let Some(target) = target else {
        return vec![create_missing_domain_candidate(manifest)];
    };
    target
        .auth
        .iter()
        .flatten()
        .enumerate()
        .filter_map(|(index, auth)| {
            let auth = auth.as_interactive()?;
            Some(to_sign_in_candidate(auth, index, target, context))
        })
        .collect()
}
