use crate::auth_fallback::auth_candidate::AuthCandidate;
use crate::auth_fallback::auth_candidate_kind::AuthCandidateKind;
use usemcpkit_auth::AuthError;
use usemcpkit_manifest::Manifest;

pub fn create_missing_domain_candidate<'a>(manifest: &Manifest) -> AuthCandidate<'a> {
    let env_hint = manifest
        .domain
        .as_ref()
        .and_then(|domain| domain.env.as_deref())
        .filter(|env| !env.is_empty())
        .map(|env| format!(", set the {env} environment variable"))
        .unwrap_or_default();
    AuthCandidate {
        label: "domain".to_owned(),
        kind: AuthCandidateKind::Interactive,
        resolve: Box::new(move || Box::pin(async move { Err(AuthError(format!("no domain is set{env_hint}"))) })),
    }
}
