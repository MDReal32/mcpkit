use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::candidates::create_no_auth_candidate::create_no_auth_candidate;
use crate::auth_fallback::candidates::create_stored_candidate::create_stored_candidate;
use crate::auth_fallback::candidates::to_fallback_candidate::to_fallback_candidate;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::auth::AuthSpec;
use std::rc::Rc;

/// Auth that needs nothing from the user: the `tokens.json` token and fallbacks whose credentials are set or saved.
pub fn list_provided_candidates<'a>(
    manifest: &Rc<Manifest>,
    domain: Option<&'a str>,
    context: &'a CallContext,
) -> Vec<AuthCandidate<'a>> {
    let auth = manifest.auth.as_deref().unwrap_or_default();
    if auth.is_empty() {
        return vec![create_no_auth_candidate(manifest)];
    }
    let stored = auth
        .iter()
        .any(AuthSpec::is_interactive)
        .then(|| create_stored_candidate(manifest, context));
    let fallbacks = auth
        .iter()
        .enumerate()
        .filter(|(_, entry)| !entry.is_interactive())
        .map(|(index, entry)| to_fallback_candidate(entry, index, manifest, domain, context));
    stored.into_iter().chain(fallbacks).collect()
}
