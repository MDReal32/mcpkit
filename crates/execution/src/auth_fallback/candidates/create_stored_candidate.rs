use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use mcpkit_auth::AuthResolution;
use mcpkit_auth::resolve::resolve_stored_auth;
use mcpkit_manifest::Manifest;
use std::rc::Rc;

pub fn create_stored_candidate<'a>(manifest: &Rc<Manifest>, context: &'a CallContext) -> AuthCandidate<'a> {
    let manifest = Rc::clone(manifest);
    AuthCandidate {
        label: "tokens.json".to_owned(),
        kind: AuthCandidateKind::Stored,
        resolve: Box::new(move || {
            Box::pin(async move {
                let auth = manifest.auth.as_deref().unwrap_or_default();
                let resolved = resolve_stored_auth(&manifest.name, auth, &context.auth).await?;
                Ok(AuthResolution {
                    auth: resolved,
                    manifest,
                })
            })
        }),
    }
}
