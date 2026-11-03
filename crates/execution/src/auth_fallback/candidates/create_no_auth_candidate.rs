use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use mcpkit_auth::{AuthResolution, ResolvedAuth};
use mcpkit_manifest::Manifest;
use std::rc::Rc;

pub fn create_no_auth_candidate<'a>(manifest: &Rc<Manifest>) -> AuthCandidate<'a> {
    let resolution = AuthResolution {
        auth: ResolvedAuth::default(),
        manifest: Rc::clone(manifest),
    };
    AuthCandidate {
        label: "no auth".to_owned(),
        kind: AuthCandidateKind::Provided,
        resolve: Box::new(move || Box::pin(async move { Ok(resolution) })),
    }
}
