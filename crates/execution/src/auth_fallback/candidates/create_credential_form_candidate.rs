use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use mcpkit_auth::credentials::resolve_credential_form;
use mcpkit_manifest::Manifest;
use std::rc::Rc;

pub fn create_credential_form_candidate<'a>(
    manifest: &Manifest,
    domain: Option<&'a str>,
    context: &'a CallContext,
) -> AuthCandidate<'a> {
    let manifest = Rc::new(manifest.clone());
    AuthCandidate {
        label: "credentials form".to_owned(),
        kind: AuthCandidateKind::Interactive,
        resolve: Box::new(move || {
            Box::pin(async move { resolve_credential_form(&manifest, domain, &context.auth).await })
        }),
    }
}
