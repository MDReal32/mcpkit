use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::candidates::create_credential_form_candidate::create_credential_form_candidate;
use crate::auth_fallback::candidates::create_missing_domain_candidate::create_missing_domain_candidate;
use crate::auth_fallback::candidates::offers_credential_form::offers_credential_form;
use crate::auth_fallback::candidates::to_sign_in_candidate::to_sign_in_candidate;
use mcpkit_manifest::Manifest;
use std::rc::Rc;

/// The credentials form when there is one to show, else the OAuth2 browser sign-ins, or the candidate that says the
/// domain is missing.
pub fn list_interactive_candidates<'a>(
    manifest: &Manifest,
    target: Option<&Rc<Manifest>>,
    domain: Option<&'a str>,
    context: &'a CallContext,
) -> Vec<AuthCandidate<'a>> {
    if offers_credential_form(manifest, context) {
        return vec![create_credential_form_candidate(manifest, domain, context)];
    }
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
