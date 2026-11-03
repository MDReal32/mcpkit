use crate::CallContext;
use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use mcpkit_auth::AuthResolution;
use mcpkit_auth::resolve::resolve_fallback_auth;
use mcpkit_manifest::Manifest;
use mcpkit_manifest::auth::AuthSpec;
use std::rc::Rc;

pub fn to_fallback_candidate<'a>(
    auth: &AuthSpec,
    index: usize,
    manifest: &Rc<Manifest>,
    domain: Option<&'a str>,
    context: &'a CallContext,
) -> AuthCandidate<'a> {
    let (auth, manifest) = (auth.clone(), Rc::clone(manifest));
    AuthCandidate {
        label: format!("auth[{index}] {}", auth.describe()),
        kind: AuthCandidateKind::Provided,
        resolve: Box::new(move || {
            Box::pin(async move {
                let resolved = resolve_fallback_auth(&auth, &manifest, domain, &context.auth).await?;
                Ok(AuthResolution {
                    auth: resolved,
                    manifest,
                    save: None,
                })
            })
        }),
    }
}
