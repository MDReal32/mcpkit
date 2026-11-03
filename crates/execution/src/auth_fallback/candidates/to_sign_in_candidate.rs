use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use mcpkit_auth::AuthResolution;
use mcpkit_auth::resolve::resolve_signed_in_auth;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::auth::{AuthSpec, OAuthAuth};
use std::rc::Rc;

pub fn to_sign_in_candidate<'a>(
    auth: &OAuthAuth,
    index: usize,
    manifest: &Rc<Manifest>,
    context: &'a CallContext,
) -> AuthCandidate<'a> {
    let (auth, manifest) = (auth.clone(), Rc::clone(manifest));
    AuthCandidate {
        label: format!("auth[{index}] {} sign-in", AuthSpec::OAuth(auth.clone()).describe()),
        kind: AuthCandidateKind::Interactive,
        resolve: Box::new(move || {
            Box::pin(async move {
                let resolved = resolve_signed_in_auth(&manifest.name, &auth, &context.auth).await?;
                Ok(AuthResolution {
                    auth: resolved,
                    manifest,
                    save: None,
                })
            })
        }),
    }
}
