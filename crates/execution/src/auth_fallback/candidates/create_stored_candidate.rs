use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use std::rc::Rc;
use usemcpkit_auth::resolve::resolve_stored_auth;
use usemcpkit_auth::{AuthResolution, ServerKey};
use usemcpkit_manifest::Manifest;

pub fn create_stored_candidate<'a>(manifest: &Rc<Manifest>, context: &'a CallContext) -> AuthCandidate<'a> {
    let manifest = Rc::clone(manifest);
    AuthCandidate {
        label: "signIn".to_owned(),
        kind: AuthCandidateKind::Stored,
        resolve: Box::new(move || {
            Box::pin(async move {
                let auth = manifest.auth.as_deref().unwrap_or_default();
                let resolved = resolve_stored_auth(&ServerKey::of(&manifest), auth, &context.auth).await?;
                Ok(AuthResolution {
                    auth: resolved,
                    manifest,
                    save: None,
                })
            })
        }),
    }
}
